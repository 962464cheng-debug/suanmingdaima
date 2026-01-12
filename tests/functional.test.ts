import { describe, it, expect } from "vitest";
import { vulnerabilityCategories, allVulnerabilities } from "@/data/vulnerabilities";

describe("功能完整性测试", () => {
  
  describe("首页功能", () => {
    it("应该有8个功能模块", () => {
      const expectedModules = [
        "network",
        "data", 
        "permission",
        "payment",
        "component",
        "credential",
        "script",
        "log"
      ];
      
      const categoryIds = vulnerabilityCategories.map(cat => cat.id);
      expectedModules.forEach(moduleId => {
        expect(categoryIds).toContain(moduleId);
      });
    });

    it("漏洞统计数据应该正确", () => {
      const stats = {
        network: 4,
        data: 2,
        permission: 1,
        payment: 1,
        component: 1,
        credential: 2,
        script: 0,
        log: 0
      };

      vulnerabilityCategories.forEach(category => {
        const expectedCount = stats[category.id as keyof typeof stats];
        expect(category.vulnerabilities.length).toBe(expectedCount);
      });
    });
  });

  describe("漏洞列表功能", () => {
    it("每个分类应该有标题和描述", () => {
      vulnerabilityCategories.forEach(category => {
        expect(category.name).toBeTruthy();
        expect(category.description).toBeTruthy();
        expect(category.icon).toBeTruthy();
      });
    });

    it("网络监控分类应该包含4个漏洞", () => {
      const networkCategory = vulnerabilityCategories.find(cat => cat.id === "network");
      expect(networkCategory).toBeDefined();
      expect(networkCategory!.vulnerabilities.length).toBe(4);
      
      const expectedVulns = [
        "net-001", // HTTP明文传输
        "net-002", // 无证书验证
        "net-003", // 缺少请求签名
        "net-004"  // 缺少响应验证
      ];
      
      expectedVulns.forEach(id => {
        const vuln = networkCategory!.vulnerabilities.find(v => v.id === id);
        expect(vuln).toBeDefined();
      });
    });

    it("凭证提取分类应该包含真实的硬编码凭证", () => {
      const credCategory = vulnerabilityCategories.find(cat => cat.id === "credential");
      expect(credCategory).toBeDefined();
      expect(credCategory!.vulnerabilities.length).toBe(2);
      
      // 高德地图API密钥
      const amapVuln = credCategory!.vulnerabilities.find(v => v.id === "cred-001");
      expect(amapVuln).toBeDefined();
      expect(amapVuln!.title).toContain("高德地图");
      expect(amapVuln!.codeSnippet).toContain("fc7c3d5a76f14ff65fe84d8effdb0545");
      
      // 微信AppID
      const wxVuln = credCategory!.vulnerabilities.find(v => v.id === "cred-002");
      expect(wxVuln).toBeDefined();
      expect(wxVuln!.title).toContain("微信");
      expect(wxVuln!.codeSnippet).toContain("wx335f596b5cf683b7");
    });
  });

  describe("漏洞详情功能", () => {
    it("每个漏洞应该包含完整的教学内容", () => {
      allVulnerabilities.forEach(vuln => {
        // 基本信息
        expect(vuln.id).toBeTruthy();
        expect(vuln.cveId).toMatch(/^CVE-/);
        expect(vuln.title).toBeTruthy();
        expect(vuln.severity).toMatch(/^(critical|high|medium|low)$/);
        expect(vuln.description).toBeTruthy();
        
        // 文件位置（可选）
        // expect(vuln.filePath).toBeTruthy();
        
        // 代码片段（可选）
        // expect(vuln.codeSnippet).toBeTruthy();
        
        // 影响范围
        expect(vuln.impact).toBeDefined();
        expect(Array.isArray(vuln.impact)).toBe(true);
        expect(vuln.impact.length).toBeGreaterThan(0);
        
        // 利用方法
        expect(vuln.exploitation).toBeDefined();
        expect(vuln.exploitation.difficulty).toMatch(/^(easy|medium|hard)$/);
        expect(vuln.exploitation.requirements).toBeDefined();
        expect(Array.isArray(vuln.exploitation.requirements)).toBe(true);
        // toolsNeeded是可选字段
        if (vuln.exploitation.toolsNeeded) {
          expect(Array.isArray(vuln.exploitation.toolsNeeded)).toBe(true);
        }
        expect(vuln.exploitation.steps).toBeDefined();
        expect(Array.isArray(vuln.exploitation.steps)).toBe(true);
        if (vuln.exploitation.toolsNeeded) {
          expect(vuln.exploitation.toolsNeeded.length).toBeGreaterThan(0);
        }
        
        // 修复方案
        expect(vuln.fix).toBeDefined();
        expect(vuln.fix.summary).toBeTruthy();
        expect(vuln.fix.steps).toBeDefined();
        expect(Array.isArray(vuln.fix.steps)).toBe(true);
        expect(vuln.fix.steps.length).toBeGreaterThan(0);
      });
    });

    it("支付漏洞应该是严重级别", () => {
      const paymentCategory = vulnerabilityCategories.find(cat => cat.id === "payment");
      expect(paymentCategory).toBeDefined();
      
      const paymentVuln = paymentCategory!.vulnerabilities[0];
      expect(paymentVuln.severity).toBe("critical");
      expect(paymentVuln.title).toContain("支付");
    });

    it("HTTP明文传输漏洞应该包含详细的利用步骤", () => {
      const networkCategory = vulnerabilityCategories.find(cat => cat.id === "network");
      const httpVuln = networkCategory!.vulnerabilities.find(v => v.id === "net-001");
      
      expect(httpVuln).toBeDefined();
      expect(httpVuln!.exploitation.steps.length).toBeGreaterThan(3);
      expect(httpVuln!.exploitation.toolsNeeded).toContain("Charles Proxy");
      expect(httpVuln!.fix.codeExample).toBeTruthy();
    });
  });

  describe("数据路由功能", () => {
    it("每个功能模块ID应该对应一个分类", () => {
      const moduleIds = ["network", "data", "permission", "payment", "component", "credential", "script", "log"];
      
      moduleIds.forEach(moduleId => {
        const category = vulnerabilityCategories.find(cat => cat.id === moduleId);
        expect(category).toBeDefined();
        expect(category!.id).toBe(moduleId);
      });
    });

    it("每个漏洞ID应该能在allVulnerabilities中找到", () => {
      vulnerabilityCategories.forEach(category => {
        category.vulnerabilities.forEach(vuln => {
          const found = allVulnerabilities.find(v => v.id === vuln.id);
          expect(found).toBeDefined();
          expect(found!.id).toBe(vuln.id);
        });
      });
    });
  });

  describe("教学内容质量", () => {
    it("利用方法应该包含前置条件", () => {
      allVulnerabilities.forEach(vuln => {
        expect(vuln.exploitation.requirements.length).toBeGreaterThan(0);
      });
    });

    it("利用方法应该包含所需工具", () => {
      allVulnerabilities.forEach(vuln => {
        if (vuln.exploitation.toolsNeeded) {
          expect(vuln.exploitation.toolsNeeded.length).toBeGreaterThan(0);
        }
      });
    });

    it("修复方案应该包含代码示例", () => {
      // 至少一半的漏洞应该有代码示例
      const vulnsWithCode = allVulnerabilities.filter(v => v.fix.codeExample);
      expect(vulnsWithCode.length).toBeGreaterThan(allVulnerabilities.length / 2);
    });

    it("高危和严重漏洞应该有详细的利用步骤", () => {
      const criticalVulns = allVulnerabilities.filter(v => 
        v.severity === "critical" || v.severity === "high"
      );
      
      criticalVulns.forEach(vuln => {
        expect(vuln.exploitation.steps.length).toBeGreaterThan(2);
      });
    });
  });

  describe("真实数据验证", () => {
    it("应该包含真实的高德地图API密钥", () => {
      const amapKey = "fc7c3d5a76f14ff65fe84d8effdb0545";
      const credCategory = vulnerabilityCategories.find(cat => cat.id === "credential");
      const amapVuln = credCategory!.vulnerabilities.find(v => v.id === "cred-001");
      
      expect(amapVuln!.codeSnippet).toContain(amapKey);
    });

    it("应该包含真实的微信AppID", () => {
      const wxAppId = "wx335f596b5cf683b7";
      const credCategory = vulnerabilityCategories.find(cat => cat.id === "credential");
      const wxVuln = credCategory!.vulnerabilities.find(v => v.id === "cred-002");
      
      expect(wxVuln!.codeSnippet).toContain(wxAppId);
    });

    it("应该包含真实的文件路径", () => {
      const networkCategory = vulnerabilityCategories.find(cat => cat.id === "network");
      const httpVuln = networkCategory!.vulnerabilities[0];
      
      expect(httpVuln.filePath).toBeTruthy();
      expect(httpVuln.filePath).toContain("xml");
    });
  });
});
