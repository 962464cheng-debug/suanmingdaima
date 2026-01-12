# Android Studio 项目配置指南

## 项目已补齐完整的Android架构 ✅

您的项目现在已包含完整的Android原生项目结构，可以被Android Studio正确识别。

---

## 项目结构说明

```
admin-assistant/
├── android/                          # ✅ 新增：Android原生项目
│   ├── app/                          # 应用模块
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/             # Kotlin源代码
│   │   │   │   │   └── space/manus/admin/assistant/t20260111051820/
│   │   │   │   │       ├── MainActivity.kt
│   │   │   │   │       └── MainApplication.kt
│   │   │   │   ├── res/              # 资源文件（图标、布局等）
│   │   │   │   │   ├── drawable/
│   │   │   │   │   ├── mipmap/
│   │   │   │   │   └── values/
│   │   │   │   ├── AndroidManifest.xml
│   │   │   ├── debug/
│   │   │   └── debugOptimized/
│   │   ├── build.gradle              # 应用级构建配置
│   │   ├── proguard-rules.pro        # 代码混淆规则
│   │   └── debug.keystore            # 调试密钥库
│   ├── gradle/                       # Gradle包装器
│   ├── build.gradle                  # 项目级构建配置
│   ├── settings.gradle               # 项目设置
│   ├── gradle.properties             # Gradle属性
│   ├── gradlew                       # Linux/Mac构建脚本
│   └── gradlew.bat                   # Windows构建脚本
├── app/                              # React Native/Expo应用源代码
├── package.json                      # Node.js依赖
├── app.config.ts                     # Expo配置
└── ...其他文件
```

---

## 在Android Studio中打开项目

### 方式1：直接打开（推荐）

1. 打开 **Android Studio**
2. 选择 **File → Open**
3. 导航到项目目录：`/home/ubuntu/admin-assistant`
4. 点击 **Open**
5. Android Studio 将自动识别为 Android 项目
6. 等待 Gradle 同步完成（首次可能需要几分钟）

### 方式2：打开Android子项目

如果只想在Android Studio中编辑Android部分：

1. 打开 **Android Studio**
2. 选择 **File → Open**
3. 导航到：`/home/ubuntu/admin-assistant/android`
4. 点击 **Open**

---

## 项目配置详情

### 应用信息

| 项目 | 值 |
|-----|-----|
| **应用名称** | 超管助手 (Admin Assistant) |
| **包名** | `space.manus.admin.assistant.t20260111051820` |
| **版本** | 1.0.0 |
| **最低SDK版本** | Android 5.0+ |
| **目标SDK版本** | Android 14+ |
| **编译工具版本** | 34+ |

### 主要技术栈

- **前端框架**: React Native 0.81 + Expo SDK 54
- **语言**: Kotlin (Android) + TypeScript (React Native)
- **UI框架**: NativeWind (Tailwind CSS)
- **路由**: Expo Router 6
- **后端**: Express + tRPC
- **数据库**: MySQL/TiDB + Drizzle ORM

### 权限配置

项目已配置以下权限（在 `AndroidManifest.xml` 中）：

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>
<uses-permission android:name="android.permission.VIBRATE"/>
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW"/>
<uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK"/>
```

---

## 构建和运行

### 前置要求

1. **Android Studio** (最新版本)
2. **Android SDK** (API 34 或更高)
3. **Java JDK 17** 或更高
4. **Node.js 18+** 和 **pnpm 9.12.0+**

### 在模拟器上运行

#### 方式1：使用Android Studio（推荐）

1. 在Android Studio中打开项目
2. 创建或选择 Android 虚拟设备 (AVD)
3. 点击 **Run → Run 'app'**
4. 选择目标设备
5. 应用将构建并在模拟器上运行

#### 方式2：使用命令行

```bash
cd /home/ubuntu/admin-assistant

# 安装依赖
pnpm install

# 构建并运行（需要配置ANDROID_HOME）
pnpm android
```

### 在真实设备上运行

1. 使用USB线连接Android设备
2. 在设备上启用 **USB调试**（设置 → 开发者选项）
3. 在Android Studio中点击 **Run → Run 'app'**
4. 选择您的设备
5. 应用将安装并运行

---

## 构建APK

### 调试APK

```bash
cd /home/ubuntu/admin-assistant/android
./gradlew assembleDebug
```

APK位置：`android/app/build/outputs/apk/debug/app-debug.apk`

### 发布APK

```bash
cd /home/ubuntu/admin-assistant/android
./gradlew assembleRelease
```

APK位置：`android/app/build/outputs/apk/release/app-release.apk`

### 使用EAS Build（推荐用于分发）

```bash
# 安装EAS CLI
npm install -g eas-cli

# 登录Expo账号
eas login

# 构建APK
cd /home/ubuntu/admin-assistant
eas build --platform android --profile preview
```

---

## 常见问题

### Q1: Gradle同步失败

**解决方案**：
```bash
# 清除Gradle缓存
cd /home/ubuntu/admin-assistant/android
./gradlew clean

# 重新同步
# 在Android Studio中：Build → Clean Project → Build → Rebuild Project
```

### Q2: "Cannot find symbol" 错误

**解决方案**：
1. 确保 Node.js 依赖已安装：`pnpm install`
2. 在Android Studio中：File → Sync Now
3. Build → Rebuild Project

### Q3: 编译错误 "Unsupported class-file format"

**解决方案**：
1. 检查Java版本：`java -version`（应为17或更高）
2. 在Android Studio中：File → Project Structure → SDK Location
3. 确保 JDK 版本为 17+

### Q4: 模拟器无法启动

**解决方案**：
1. 打开 Android Studio
2. 点击 **Tools → Device Manager**
3. 创建新的虚拟设备或修复现有设备
4. 确保您的系统支持虚拟化

### Q5: 应用在设备上崩溃

**解决方案**：
1. 检查 Logcat 输出（View → Tool Windows → Logcat）
2. 查看错误日志
3. 确保所有权限已在设备上授予
4. 检查网络连接（应用需要网络访问）

---

## 开发工作流

### 修改React Native代码

1. 编辑 `app/` 目录中的TypeScript文件
2. 保存文件后，Metro打包器会自动重新加载
3. 在模拟器/设备上按 `R` 键刷新应用

### 修改Android原生代码

1. 编辑 `android/` 目录中的Kotlin文件
2. 在Android Studio中点击 **Build → Rebuild Project**
3. 运行应用以查看更改

### 添加新的原生模块

1. 在 `android/app/src/main/java/` 中创建新的Kotlin文件
2. 实现所需的功能
3. 在Android Studio中重新构建

---

## 调试

### 使用Android Studio调试器

1. 在代码中设置断点
2. 点击 **Run → Debug 'app'**
3. 应用将在断点处暂停
4. 使用调试工具检查变量和执行流程

### 查看日志

1. 打开 **Logcat**（View → Tool Windows → Logcat）
2. 过滤日志以查看特定应用的消息
3. 搜索错误或警告

---

## 项目维护

### 更新依赖

```bash
cd /home/ubuntu/admin-assistant

# 更新Node.js依赖
pnpm update

# 更新Android Gradle插件
# 在Android Studio中：Help → Check for Updates
```

### 清理构建

```bash
cd /home/ubuntu/admin-assistant

# 清除所有构建输出
pnpm clean
cd android && ./gradlew clean && cd ..

# 重新安装依赖
pnpm install
```

---

## 下一步

1. ✅ **项目已可在Android Studio中打开**
2. 📱 **在模拟器或设备上测试应用**
3. 🔧 **根据需要修改和扩展功能**
4. 📦 **构建APK进行分发**

---

## 支持资源

- [Android Studio文档](https://developer.android.com/studio/intro)
- [React Native文档](https://reactnative.dev)
- [Expo文档](https://docs.expo.dev)
- [Gradle文档](https://docs.gradle.org)

---

**项目状态**: ✅ 已准备好在Android Studio中使用  
**生成日期**: 2026-01-11  
**版本**: 1.0.0
