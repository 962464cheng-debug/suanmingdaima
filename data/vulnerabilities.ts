import { VulnerabilityDetail, VulnerabilityCategory } from "@/types/vulnerability";

// 网络通信安全漏洞
const networkVulnerabilities: VulnerabilityDetail[] = [
  {
    id: "net-001",
    cveId: "CVE-CLEARTEXT-001",
    title: "允许明文HTTP流量",
    severity: "high",
    category: "网络通信",
    description: "应用配置允许发送和接收明文HTTP流量，所有网络通信都可被中间人拦截。",
    filePath: "res/xml/network_config.xml",
    codeSnippet: `<network-security-config>
  <base-config cleartextTrafficPermitted="true">
    <trust-anchors>
      <certificates src="system" />
    </trust-anchors>
  </base-config>
</network-security-config>`,
    lineNumber: 2,
    impact: [
      "登录凭证可被窃取",
      "支付信息可被拦截",
      "用户隐私数据泄露",
      "会话劫持风险"
    ],
    exploitation: {
      difficulty: "easy",
      requirements: [
        "与目标设备在同一WiFi网络",
        "HTTP代理工具（如Charles、Burp Suite）",
        "无需Root权限"
      ],
      steps: [
        "1. 在PC上启动Charles代理，设置为HTTP代理模式",
        "2. 手机连接到PC的代理（设置 → WiFi → 代理）",
        "3. 在手机上打开目标应用",
        "4. Charles中即可看到所有明文HTTP请求",
        "5. 可以修改请求参数并重放"
      ],
      toolsNeeded: ["Charles Proxy", "Burp Suite", "mitmproxy"]
    },
    fix: {
      summary: "禁用明文流量，强制使用HTTPS",
      steps: [
        "1. 修改network_config.xml",
        "2. 将cleartextTrafficPermitted设置为false",
        "3. 确保所有API端点使用HTTPS",
        "4. 实现证书钉扎(Certificate Pinning)"
      ],
      codeExample: `<network-security-config>
  <base-config cleartextTrafficPermitted="false">
    <trust-anchors>
      <certificates src="system" />
    </trust-anchors>
  </base-config>
</network-security-config>`
    }
  },
  {
    id: "net-002",
    cveId: "CVE-SSL-001",
    title: "无证书验证的HTTPS连接",
    severity: "high",
    category: "网络通信",
    description: "应用未实现Certificate Pinning，使用默认的系统证书验证，容易受到伪造证书攻击。",
    impact: [
      "中间人攻击风险",
      "HTTPS流量可被解密",
      "敏感数据泄露"
    ],
    exploitation: {
      difficulty: "medium",
      requirements: [
        "安装自签名证书到系统",
        "HTTPS代理工具",
        "目标应用未实现证书钉扎"
      ],
      steps: [
        "1. 在手机上安装Charles的根证书",
        "2. 设置手机使用Charles代理",
        "3. Charles会自动解密HTTPS流量",
        "4. 可以查看和修改加密的请求"
      ],
      toolsNeeded: ["Charles Proxy + SSL证书", "Burp Suite + CA证书"]
    },
    fix: {
      summary: "实现证书钉扎，只信任特定证书",
      steps: [
        "1. 获取服务器证书的公钥哈希",
        "2. 在network_config.xml中配置pin-set",
        "3. 或在代码中使用OkHttp的CertificatePinner",
        "4. 定期更新钉扎的证书"
      ],
      codeExample: `// OkHttp Certificate Pinning
val certificatePinner = CertificatePinner.Builder()
  .add("api.example.com", "sha256/AAAAAAAAAA...")
  .build()

val client = OkHttpClient.Builder()
  .certificatePinner(certificatePinner)
  .build()`
    }
  },
  {
    id: "net-003",
    cveId: "CVE-SIGNATURE-001",
    title: "缺少请求签名验证",
    severity: "medium",
    category: "网络通信",
    description: "应用发送的请求没有签名，攻击者可以修改请求参数而不被发现。",
    impact: [
      "请求参数可被篡改",
      "重放攻击风险",
      "业务逻辑绕过"
    ],
    exploitation: {
      difficulty: "easy",
      requirements: [
        "HTTP代理工具",
        "了解API接口参数"
      ],
      steps: [
        "1. 拦截正常的API请求",
        "2. 修改请求参数（如金额、数量）",
        "3. 重放修改后的请求",
        "4. 服务器无法检测到篡改"
      ]
    },
    fix: {
      summary: "为所有请求添加HMAC签名",
      steps: [
        "1. 客户端和服务器共享密钥",
        "2. 对请求参数进行排序和拼接",
        "3. 使用HMAC-SHA256生成签名",
        "4. 将签名添加到请求头",
        "5. 服务器验证签名"
      ],
      codeExample: `// 生成请求签名
fun generateSignature(params: Map<String, String>, secret: String): String {
  val sortedParams = params.toSortedMap()
  val paramString = sortedParams.entries.joinToString("&") { "\${it.key}=\${it.value}" }
  val mac = Mac.getInstance("HmacSHA256")
  mac.init(SecretKeySpec(secret.toByteArray(), "HmacSHA256"))
  return Base64.encodeToString(mac.doFinal(paramString.toByteArray()), Base64.NO_WRAP)
}`
    }
  },
  {
    id: "net-004",
    cveId: "CVE-RESPONSE-001",
    title: "缺少响应验证",
    severity: "high",
    category: "网络通信",
    description: "应用不验证服务器响应的真实性，攻击者可以伪造响应数据。",
    filePath: "com/leyou/ruianmahjong/wxapi/WXPayEntryActivity.java",
    codeSnippet: `if (baseResp.errCode == 0) {  // 直接相信errCode
  JSONObject jSONObject2 = new JSONObject();
  jSONObject2.put("ret", 1);
  jSONObject = jSONObject2.toString();
}
LuaEvent.callbackToLua("wechatPayOrderResp", jSONObject);`,
    lineNumber: 49,
    impact: [
      "支付结果可被伪造",
      "业务逻辑被绕过",
      "虚拟货币可被非法获取"
    ],
    exploitation: {
      difficulty: "medium",
      requirements: [
        "HTTP代理工具",
        "了解响应格式"
      ],
      steps: [
        "1. 拦截支付请求",
        "2. 修改服务器响应为成功状态",
        "3. 应用直接相信伪造的响应",
        "4. 获得虚拟货币或解锁功能"
      ]
    },
    fix: {
      summary: "服务器端验证支付结果",
      steps: [
        "1. 客户端收到支付回调后，不要直接相信",
        "2. 将订单ID发送到自己的服务器",
        "3. 服务器向支付平台查询真实结果",
        "4. 验证通过后才发放虚拟货币",
        "5. 为响应添加签名验证"
      ],
      codeExample: `// 正确的支付验证流程
override fun onResp(baseResp: BaseResp) {
  if (baseResp.type == ConstantsAPI.COMMAND_PAY_BY_WX) {
    // 不要直接相信errCode
    val orderId = getOrderId()
    // 发送到服务器验证
    api.verifyPayment(orderId) { result ->
      if (result.isSuccess) {
        // 服务器验证通过才处理
        handlePaymentSuccess()
      }
    }
  }
}`
    }
  }
];

// 硬编码凭证漏洞
const credentialVulnerabilities: VulnerabilityDetail[] = [
  {
    id: "cred-001",
    cveId: "CVE-HARDCODED-001",
    title: "高德地图API密钥硬编码",
    severity: "medium",
    category: "硬编码凭证",
    description: "高德地图API密钥以明文形式硬编码在AndroidManifest.xml中，任何人可通过反编译APK获取。",
    filePath: "AndroidManifest.xml",
    codeSnippet: `<meta-data
  android:name="com.amap.api.v2.apikey"
  android:value="fc7c3d5a76f14ff65fe84d8effdb0545" />`,
    lineNumber: 49,
    impact: [
      "API密钥被滥用",
      "产生额外费用",
      "配额被耗尽",
      "服务被封禁"
    ],
    exploitation: {
      difficulty: "easy",
      requirements: [
        "APK文件",
        "APKTool或jadx反编译工具"
      ],
      steps: [
        "1. 下载目标应用的APK文件",
        "2. 使用apktool反编译：apktool d app.apk",
        "3. 打开AndroidManifest.xml文件",
        "4. 搜索\"amap.api.v2.apikey\"",
        "5. 复制API密钥：fc7c3d5a76f14ff65fe84d8effdb0545",
        "6. 可以在自己的应用中使用该密钥"
      ],
      toolsNeeded: ["apktool", "jadx", "strings命令"]
    },
    fix: {
      summary: "使用服务器代理或动态获取密钥",
      steps: [
        "1. 不要在客户端硬编码API密钥",
        "2. 方案A：通过自己的服务器代理高德API",
        "3. 方案B：应用启动时从服务器动态获取密钥",
        "4. 方案C：使用ProGuard混淆密钥字符串",
        "5. 限制API密钥的使用范围和配额"
      ],
      codeExample: `// 从服务器获取API密钥
class MapKeyManager {
  private var apiKey: String? = null
  
  suspend fun getApiKey(): String {
    if (apiKey == null) {
      apiKey = api.fetchMapKey().key
    }
    return apiKey!!
  }
}

// 服务器端验证来源
app.get('/api/map-key', (req, res) => {
  // 验证请求来源
  if (!validateAppSignature(req)) {
    return res.status(403).send('Forbidden');
  }
  res.json({ key: process.env.AMAP_API_KEY });
});`
    }
  },
  {
    id: "cred-002",
    cveId: "CVE-HARDCODED-002",
    title: "微信应用ID硬编码",
    severity: "low",
    category: "硬编码凭证",
    description: "微信应用ID在多个地方硬编码，虽然危害较小，但不符合安全最佳实践。",
    filePath: "res/values/strings.xml",
    codeSnippet: `<string name="wx_app_id">wx335f596b5cf683b7</string>`,
    lineNumber: 62,
    impact: [
      "应用ID泄露",
      "可能被用于钓鱼",
      "品牌形象受损"
    ],
    exploitation: {
      difficulty: "easy",
      requirements: ["反编译工具"],
      steps: [
        "1. 反编译APK",
        "2. 查看res/values/strings.xml",
        "3. 获取微信AppID：wx335f596b5cf683b7"
      ]
    },
    fix: {
      summary: "虽然微信AppID公开影响不大，但建议使用BuildConfig",
      steps: [
        "1. 在build.gradle中定义BuildConfig字段",
        "2. 从代码中引用BuildConfig.WX_APP_ID",
        "3. 使用ProGuard混淆"
      ],
      codeExample: `// build.gradle
android {
  defaultConfig {
    buildConfigField "String", "WX_APP_ID", "\\"wx335f596b5cf683b7\\""
  }
}

// 代码中使用
val wxApi = WXAPIFactory.createWXAPI(context, BuildConfig.WX_APP_ID)`
    }
  }
];

// 导出组件漏洞
const componentVulnerabilities: VulnerabilityDetail[] = [
  {
    id: "comp-001",
    cveId: "CVE-EXPORTED-001",
    title: "WXPayEntryActivity导出",
    severity: "high",
    category: "导出组件",
    description: "支付回调Activity被导出，任何应用可以启动此Activity并伪造支付结果。",
    filePath: "AndroidManifest.xml",
    codeSnippet: `<activity
  android:exported="true"
  android:name="com.leyou.ruianmahjong.wxapi.WXPayEntryActivity"
  android:launchMode="singleTop">
  <intent-filter>
    <action android:name="com.tencent.mm.action.HANDLE_WX_RESPONSE"/>
  </intent-filter>
</activity>`,
    lineNumber: 42,
    impact: [
      "支付结果可被劫持",
      "虚拟货币可被非法获取",
      "业务逻辑被绕过"
    ],
    exploitation: {
      difficulty: "medium",
      requirements: [
        "了解Intent机制",
        "ADB工具或自己的应用"
      ],
      steps: [
        "1. 创建一个恶意应用",
        "2. 构造Intent启动WXPayEntryActivity",
        "3. 传递伪造的支付成功参数",
        "4. 目标应用收到伪造的支付回调"
      ],
      toolsNeeded: ["Android Studio", "ADB"]
    },
    fix: {
      summary: "不导出支付回调Activity，或添加权限验证",
      steps: [
        "1. 如果不需要被外部调用，设置exported=false",
        "2. 如果必须导出（微信要求），在onCreate中验证调用来源",
        "3. 使用signature级别的自定义权限",
        "4. 服务器端验证支付结果"
      ],
      codeExample: `// 验证调用来源
override fun onCreate(savedInstanceState: Bundle?) {
  super.onCreate(savedInstanceState)
  
  // 验证调用者签名
  val callingPackage = callingActivity?.packageName
  if (callingPackage != "com.tencent.mm") {
    finish()
    return
  }
  
  // 不要直接相信Intent中的数据
  // 必须通过服务器验证
}`
    }
  }
];

// 数据存储漏洞
const storageVulnerabilities: VulnerabilityDetail[] = [
  {
    id: "stor-001",
    cveId: "CVE-BACKUP-001",
    title: "应用备份允许",
    severity: "medium",
    category: "数据存储",
    description: "应用允许通过adb backup备份，SharedPreferences以明文形式存储，所有应用数据可被提取。",
    filePath: "AndroidManifest.xml",
    codeSnippet: `<application
  android:allowBackup="true"
  ...>`,
    lineNumber: 27,
    impact: [
      "用户数据可被提取",
      "会话令牌泄露",
      "隐私信息泄露"
    ],
    exploitation: {
      difficulty: "easy",
      requirements: [
        "USB调试开启",
        "ADB工具"
      ],
      steps: [
        "1. 连接手机到电脑，开启USB调试",
        "2. 执行：adb backup -f backup.ab com.leyou.ruianmahjong",
        "3. 手机上确认备份（无需密码）",
        "4. 提取备份：dd if=backup.ab bs=1 skip=24 | openssl zlib -d > backup.tar",
        "5. 解压：tar -xvf backup.tar",
        "6. 查看SharedPreferences：cat apps/com.leyou.ruianmahjong/sp/ChInfo.xml"
      ],
      toolsNeeded: ["ADB", "openssl", "tar"]
    },
    fix: {
      summary: "禁用备份或使用加密存储",
      steps: [
        "1. 设置android:allowBackup=\"false\"",
        "2. 或使用android:fullBackupContent指定备份规则",
        "3. 敏感数据使用EncryptedSharedPreferences",
        "4. 或使用Android Keystore加密"
      ],
      codeExample: `// 使用加密的SharedPreferences
val masterKey = MasterKey.Builder(context)
  .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
  .build()

val encryptedPrefs = EncryptedSharedPreferences.create(
  context,
  "secret_prefs",
  masterKey,
  EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
  EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
)

encryptedPrefs.edit()
  .putString("token", userToken)
  .apply()`
    }
  },
  {
    id: "stor-002",
    cveId: "CVE-STORAGE-001",
    title: "SharedPreferences明文存储",
    severity: "medium",
    category: "数据存储",
    description: "应用使用SharedPreferences以明文形式存储敏感数据，任何有设备访问权限的应用可读取。",
    filePath: "javaClass/bulySdk/PlazaApplication.java",
    codeSnippet: `SharedPreferences sharedPreferences = getSharedPreferences("ChInfo", 0);
SharedPreferences.Editor edit = sharedPreferences.edit();
edit.putString("ChannelInfo", Util.channel);
edit.putString("GameIdInfo", Util.gameid);
edit.commit();`,
    lineNumber: 24,
    impact: [
      "渠道信息泄露",
      "游戏ID泄露",
      "用户配置被篡改"
    ],
    exploitation: {
      difficulty: "easy",
      requirements: [
        "Root权限或adb backup"
      ],
      steps: [
        "1. 使用adb backup提取数据",
        "2. 或在Root设备上直接读取：",
        "   adb shell cat /data/data/com.leyou.ruianmahjong/shared_prefs/ChInfo.xml",
        "3. 查看明文数据"
      ]
    },
    fix: {
      summary: "使用EncryptedSharedPreferences",
      steps: [
        "1. 添加security-crypto依赖",
        "2. 使用EncryptedSharedPreferences替代普通SharedPreferences",
        "3. 数据自动加密存储"
      ],
      codeExample: `// 见CVE-BACKUP-001的修复代码`
    }
  }
];

// 权限滥用漏洞
const permissionVulnerabilities: VulnerabilityDetail[] = [
  {
    id: "perm-001",
    cveId: "CVE-PERMISSION-001",
    title: "过度权限-位置追踪",
    severity: "medium",
    category: "权限滥用",
    description: "游戏应用申请了精确位置权限，但实际功能并不需要位置信息。",
    filePath: "AndroidManifest.xml",
    codeSnippet: `<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />`,
    lineNumber: 18,
    impact: [
      "用户隐私泄露",
      "位置追踪",
      "用户不信任"
    ],
    exploitation: {
      difficulty: "easy",
      requirements: ["用户授予权限"],
      steps: [
        "1. 应用请求位置权限",
        "2. 用户授予权限",
        "3. 应用可以持续追踪用户位置",
        "4. 数据可能被上传到服务器"
      ]
    },
    fix: {
      summary: "移除不必要的权限",
      steps: [
        "1. 审查应用功能，确认是否真的需要位置权限",
        "2. 如果不需要，从AndroidManifest.xml中删除",
        "3. 如果需要，使用粗略位置而非精确位置",
        "4. 在隐私政策中说明位置数据的用途"
      ],
      codeExample: `<!-- 如果确实需要位置，使用粗略位置 -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- 不要同时申请精确位置 -->
<!-- <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" /> -->`
    }
  }
];

// 支付漏洞
const paymentVulnerabilities: VulnerabilityDetail[] = [
  {
    id: "pay-001",
    cveId: "CVE-PAYMENT-001",
    title: "支付结果无服务器验证",
    severity: "critical",
    category: "支付安全",
    description: "应用直接相信客户端的支付回调结果，没有通过服务器验证，支付结果可被伪造。",
    filePath: "com/leyou/ruianmahjong/wxapi/WXPayEntryActivity.java",
    codeSnippet: `if (baseResp.errCode == 0) {  // 问题：直接检查errCode
  JSONObject jSONObject2 = new JSONObject();
  jSONObject2.put("ret", 1);
  jSONObject = jSONObject2.toString();
}
LuaEvent.callbackToLua("wechatPayOrderResp", jSONObject);  // 直接回调`,
    lineNumber: 49,
    impact: [
      "免费获得虚拟货币",
      "业务损失",
      "支付欺诈"
    ],
    exploitation: {
      difficulty: "medium",
      requirements: [
        "了解支付流程",
        "能够启动导出的Activity"
      ],
      steps: [
        "1. 应用发起支付请求",
        "2. 拦截支付回调Activity",
        "3. 构造伪造的成功响应",
        "4. 应用直接相信并发放虚拟货币"
      ]
    },
    fix: {
      summary: "必须通过服务器验证支付结果",
      steps: [
        "1. 客户端收到支付回调后，不要立即处理",
        "2. 将订单ID发送到自己的服务器",
        "3. 服务器向微信/支付宝查询真实支付结果",
        "4. 验证金额、订单号等信息",
        "5. 验证通过后才发放虚拟货币",
        "6. 使用异步通知而非同步回调"
      ],
      codeExample: `// 客户端：不要直接处理支付回调
override fun onResp(baseResp: BaseResp) {
  if (baseResp.type == ConstantsAPI.COMMAND_PAY_BY_WX) {
    // 通知服务器去验证
    api.notifyPaymentCallback(orderId)
    // 显示"支付处理中"
    showProcessing()
  }
}

// 服务器：验证支付结果
app.post('/api/verify-payment', async (req, res) => {
  const { orderId } = req.body;
  
  // 向微信查询订单
  const result = await wechatPay.queryOrder(orderId);
  
  if (result.trade_state === 'SUCCESS') {
    // 验证金额
    if (result.total_fee === expectedAmount) {
      // 发放虚拟货币
      await grantVirtualCurrency(userId, amount);
      res.json({ success: true });
    }
  }
});`
    }
  }
];

// 导出分类数据
export const vulnerabilityCategories: VulnerabilityCategory[] = [
  {
    id: "network",
    name: "网络监控",
    icon: "network",
    color: "#06B6D4",
    description: "HTTP/HTTPS通信漏洞，包括明文传输、证书验证、请求签名等问题",
    vulnerabilities: networkVulnerabilities,
    totalCount: networkVulnerabilities.length
  },
  {
    id: "credential",
    name: "凭证提取",
    icon: "key",
    color: "#EF4444",
    description: "硬编码的API密钥、应用ID等敏感凭证",
    vulnerabilities: credentialVulnerabilities,
    totalCount: credentialVulnerabilities.length
  },
  {
    id: "component",
    name: "组件管理",
    icon: "widgets",
    color: "#1E3A8A",
    description: "导出的Activity、Service等组件安全问题",
    vulnerabilities: componentVulnerabilities,
    totalCount: componentVulnerabilities.length
  },
  {
    id: "data",
    name: "数据透视",
    icon: "database",
    color: "#3B82F6",
    description: "数据存储安全问题，包括备份、明文存储等",
    vulnerabilities: storageVulnerabilities,
    totalCount: storageVulnerabilities.length
  },
  {
    id: "permission",
    name: "权限管理",
    icon: "shield",
    color: "#22C55E",
    description: "过度权限申请和权限滥用问题",
    vulnerabilities: permissionVulnerabilities,
    totalCount: permissionVulnerabilities.length
  },
  {
    id: "payment",
    name: "支付破解",
    icon: "payment",
    color: "#F59E0B",
    description: "支付流程安全问题，包括结果验证、金额篡改等",
    vulnerabilities: paymentVulnerabilities,
    totalCount: paymentVulnerabilities.length
  },
  {
    id: "script",
    name: "脚本注入",
    icon: "code.script",
    color: "#8B5CF6",
    description: "Lua脚本注入和代码执行漏洞（教学示例）",
    vulnerabilities: [],
    totalCount: 0
  },
  {
    id: "log",
    name: "日志分析",
    icon: "doc.text",
    color: "#EC4899",
    description: "日志泄露和敏感信息暴露问题（教学示例）",
    vulnerabilities: [],
    totalCount: 0
  }
];

// 导出所有漏洞
export const allVulnerabilities = vulnerabilityCategories.flatMap(cat => cat.vulnerabilities);
