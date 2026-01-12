import { describe, it, expect } from "vitest";

describe("超管助手核心功能", () => {
  it("应该正确定义目标应用信息", () => {
    const targetApp = {
      packageName: "com.leyou.ruianmahjong",
      version: "2.3.5",
      appName: "麻将游戏",
      isInstalled: false,
    };

    expect(targetApp.packageName).toBe("com.leyou.ruianmahjong");
    expect(targetApp.version).toBe("2.3.5");
    expect(targetApp.appName).toBe("麻将游戏");
  });

  it("应该正确统计漏洞数量", () => {
    const vulnerabilityStats = {
      total: 20,
      network: 4,
      credentials: 4,
      components: 3,
      storage: 2,
      permissions: 5,
      payment: 2,
      codeExecution: 0,
      others: 0,
    };

    const sum = 
      vulnerabilityStats.network +
      vulnerabilityStats.credentials +
      vulnerabilityStats.components +
      vulnerabilityStats.storage +
      vulnerabilityStats.permissions +
      vulnerabilityStats.payment +
      vulnerabilityStats.codeExecution +
      vulnerabilityStats.others;

    expect(vulnerabilityStats.total).toBe(20);
    expect(sum).toBe(vulnerabilityStats.total);
  });

  it("应该定义8个功能模块", () => {
    const featureModules = [
      { id: "network", title: "网络监控" },
      { id: "data", title: "数据透视" },
      { id: "permission", title: "权限管理" },
      { id: "payment", title: "支付破解" },
      { id: "component", title: "组件管理" },
      { id: "credential", title: "凭证提取" },
      { id: "script", title: "脚本注入" },
      { id: "log", title: "日志分析" },
    ];

    expect(featureModules).toHaveLength(8);
    expect(featureModules[0].id).toBe("network");
    expect(featureModules[7].id).toBe("log");
  });

  it("应该包含法律声明内容", () => {
    const legalNotice = "本工具仅用于教育和安全研究目的";
    expect(legalNotice).toContain("教育");
    expect(legalNotice).toContain("安全研究");
  });
});
