# 超管助手 - 构建说明

## 项目信息
- **应用名称**: 超管助手 (Admin Assistant)
- **版本**: 1.0.0
- **包名**: space.manus.admin.assistant.t*
- **目标平台**: Android
- **用途**: 教育和安全研究

## 前置要求

### 必需软件
1. **Node.js** (v18或更高版本)
2. **pnpm** (v9.12.0或更高版本)
3. **Android Studio** (用于本地构建APK)
4. **Java JDK** (v17或更高版本)

### 可选软件
- **Expo Go** (用于快速测试，无需构建APK)
- **EAS CLI** (用于云端构建)

---

## 方案1: 使用Expo Go测试（推荐，最快）

这是最快的测试方式，无需构建APK。

### 步骤

1. **解压项目**
```bash
tar -xzf admin-assistant-source.tar.gz
cd admin-assistant
```

2. **安装依赖**
```bash
pnpm install
```

3. **启动开发服务器**
```bash
pnpm dev
```

4. **在手机上测试**
   - 在Android手机上安装 [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - 扫描终端显示的QR码
   - 应用将在Expo Go中运行

---

## 方案2: 使用EAS Build云端构建APK（推荐用于分发）

这是官方推荐的构建方式，无需本地Android环境。

### 步骤

1. **安装EAS CLI**
```bash
npm install -g eas-cli
```

2. **登录Expo账号**
```bash
eas login
```
（如果没有账号，访问 https://expo.dev 注册）

3. **配置项目**
```bash
cd admin-assistant
eas build:configure
```

4. **构建APK**
```bash
# 构建生产版APK
eas build --platform android --profile production

# 或构建预览版APK（更快）
eas build --platform android --profile preview
```

5. **下载APK**
   - 构建完成后，EAS会提供下载链接
   - 或访问 https://expo.dev 查看构建历史

### EAS Build配置

项目已包含基础的`eas.json`配置文件（如果没有，创建如下）：

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

---

## 方案3: 本地构建APK（需要Android开发环境）

适合有Android开发经验的用户。

### 前置步骤

1. **安装Android Studio**
   - 下载: https://developer.android.com/studio
   - 安装Android SDK (API 34或更高)
   - 配置环境变量:
     ```bash
     export ANDROID_HOME=$HOME/Android/Sdk
     export PATH=$PATH:$ANDROID_HOME/emulator
     export PATH=$PATH:$ANDROID_HOME/platform-tools
     ```

2. **安装Java JDK 17**
   ```bash
   # Ubuntu/Debian
   sudo apt install openjdk-17-jdk
   
   # macOS
   brew install openjdk@17
   ```

### 构建步骤

1. **解压并安装依赖**
```bash
tar -xzf admin-assistant-source.tar.gz
cd admin-assistant
pnpm install
```

2. **预构建原生项目**
```bash
npx expo prebuild --platform android
```

3. **构建APK**
```bash
cd android
./gradlew assembleRelease
```

4. **查找APK文件**
```bash
# APK位置
android/app/build/outputs/apk/release/app-release.apk
```

5. **签名APK（可选，用于发布）**
```bash
# 生成密钥库
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# 签名APK
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore my-release-key.keystore app-release.apk my-key-alias

# 优化APK
zipalign -v 4 app-release.apk admin-assistant-signed.apk
```

---

## 方案4: 使用Docker构建（隔离环境）

如果不想在本地安装Android环境，可以使用Docker。

```bash
# 使用Expo官方Docker镜像
docker run -it --rm \
  -v $(pwd):/app \
  -w /app \
  node:18 \
  bash -c "npm install -g pnpm eas-cli && pnpm install && eas build --platform android --profile preview"
```

---

## 构建后的安装

### 在Android设备上安装APK

1. **启用未知来源**
   - 设置 → 安全 → 允许安装未知来源的应用

2. **传输APK到手机**
   ```bash
   # 使用ADB
   adb install app-release.apk
   
   # 或通过USB传输文件
   ```

3. **手动安装**
   - 在手机上找到APK文件
   - 点击安装

---

## 常见问题

### Q1: pnpm install失败
**解决方案**: 清除缓存后重试
```bash
pnpm store prune
pnpm install --force
```

### Q2: Gradle构建失败
**解决方案**: 检查Java版本和Android SDK
```bash
java -version  # 应该是17或更高
echo $ANDROID_HOME  # 应该指向SDK目录
```

### Q3: 签名错误
**解决方案**: 确保使用正确的密钥库和别名
```bash
keytool -list -v -keystore my-release-key.keystore
```

### Q4: APK无法安装
**解决方案**: 
- 检查Android版本（需要Android 5.0+）
- 卸载旧版本后重新安装
- 检查存储空间

---

## 项目结构

```
admin-assistant/
├── app/                    # 应用页面
│   ├── (tabs)/            # Tab导航页面
│   │   ├── index.tsx      # 首页
│   │   └── settings.tsx   # 设置页
│   └── _layout.tsx        # 根布局
├── components/            # 可复用组件
├── assets/               # 静态资源
│   └── images/           # Logo和图标
├── app.config.ts         # Expo配置
├── package.json          # 依赖配置
└── theme.config.js       # 主题配置
```

---

## 技术栈

- **框架**: React Native 0.81 + Expo SDK 54
- **语言**: TypeScript 5.9
- **UI**: NativeWind 4 (Tailwind CSS)
- **状态管理**: React Hooks
- **路由**: Expo Router 6

---

## 法律声明

本工具仅用于教育和安全研究目的。

**允许用途**:
- 教育和安全研究
- 自有应用的安全测试
- 企业设备管理
- 漏洞验证和修复

**禁止用途**:
- 未授权访问他人应用
- 数据窃取
- 支付欺诈
- 任何非法目的

使用者需自行承担所有法律责任。

---

## 支持

如有问题，请参考：
- Expo文档: https://docs.expo.dev
- React Native文档: https://reactnative.dev
- EAS Build文档: https://docs.expo.dev/build/introduction

---

**构建日期**: 2026-01-11  
**版本**: 1.0.0  
**开发者**: Manus AI
