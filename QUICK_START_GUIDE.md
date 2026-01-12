# 超管助手 - 快速开始指南

## 📱 项目概述

**超管助手** (Admin Assistant) 是一个完整的跨平台移动应用，现已补齐完整的Android原生项目架构，可直接在Android Studio中开发。

### 项目特点

- ✅ **完整的Android项目** - 包含所有必要的Gradle配置和原生代码
- ✅ **React Native + Expo** - 跨平台开发框架
- ✅ **Express后端** - 完整的后端服务
- ✅ **MySQL数据库** - 使用Drizzle ORM
- ✅ **TypeScript** - 类型安全的开发体验
- ✅ **Tailwind CSS** - 现代化样式框架

---

## 🔧 前置要求

### 必需软件

在开始之前，请确保您已安装以下软件：

| 软件 | 版本 | 用途 |
|-----|------|------|
| **Node.js** | 18+ | JavaScript运行时 |
| **pnpm** | 9.12.0+ | 包管理器 |
| **Android Studio** | 最新版 | Android开发IDE |
| **Java JDK** | 17+ | Java编译器 |
| **Git** | 最新版 | 版本控制 |

### 安装步骤

#### 1. 安装Node.js和pnpm

**macOS:**
```bash
# 使用Homebrew安装Node.js
brew install node

# 安装pnpm
npm install -g pnpm@9.12.0
```

**Windows:**
- 从 https://nodejs.org 下载并安装LTS版本
- 打开PowerShell，运行：`npm install -g pnpm@9.12.0`

**Linux (Ubuntu/Debian):**
```bash
# 安装Node.js
sudo apt-get update
sudo apt-get install nodejs npm

# 安装pnpm
npm install -g pnpm@9.12.0
```

#### 2. 安装Android Studio

1. 从 https://developer.android.com/studio 下载Android Studio
2. 按照安装向导完成安装
3. 打开Android Studio，进行初始设置
4. 安装Android SDK (API 34或更高)

#### 3. 安装Java JDK 17

**macOS:**
```bash
brew install openjdk@17
```

**Windows:**
- 从 https://adoptopenjdk.net 下载并安装

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install openjdk-17-jdk
```

#### 4. 验证安装

```bash
# 检查Node.js版本
node --version  # 应该是 v18+ 

# 检查pnpm版本
pnpm --version  # 应该是 9.12.0+

# 检查Java版本
java -version   # 应该是 17+
```

---

## 📥 项目设置

### 步骤1：解压项目文件

```bash
# 解压源文件
tar -xzf admin-assistant-fixed.tar.gz

# 进入项目目录
cd admin-assistant-fixed
```

### 步骤2：安装Node.js依赖

```bash
# 使用pnpm安装依赖
pnpm install

# 或清除缓存后重新安装
pnpm store prune
pnpm install --force
```

**预期输出：**
```
Packages: +1167
Progress: resolved 0, reused 1101, downloaded 0, added 1167, done
Done in 2.9s
```

### 步骤3：验证项目结构

```bash
# 检查关键目录是否存在
ls -la android/
ls -la app/
ls -la server/

# 应该看到以下目录：
# android/app/src/main/java/...
# android/build.gradle
# android/settings.gradle
# android/gradlew
```

---

## 🚀 在Android Studio中打开项目

### 方式1：直接打开（推荐）

#### macOS/Linux:
```bash
# 在项目目录中
open .

# 或指定用Android Studio打开
open -a "Android Studio" .
```

#### Windows:
```bash
# 在项目目录中打开PowerShell或CMD
start .

# 然后在Android Studio中：
# File → Open → 选择项目目录
```

### 方式2：通过Android Studio菜单

1. 打开 **Android Studio**
2. 选择 **File → Open**
3. 导航到项目目录：`admin-assistant-fixed`
4. 点击 **Open**

### 方式3：只打开Android部分

如果只想编辑Android原生代码：

```bash
open android/
```

然后在Android Studio中打开该目录。

---

## ⏳ Gradle同步

首次打开项目时，Android Studio会自动进行Gradle同步。

### 同步过程

1. **等待Gradle下载** - 首次可能需要5-15分钟
2. **下载依赖** - Android Studio会下载必要的库
3. **编译检查** - 项目会进行初步编译检查

### 同步进度查看

- 在Android Studio底部查看进度条
- 或选择 **View → Tool Windows → Gradle** 查看详细进度

### 如果同步失败

```bash
# 清除Gradle缓存
cd android
./gradlew clean

# 重新同步
# 在Android Studio中：Build → Clean Project → Build → Rebuild Project
```

---

## 📱 配置模拟器或真实设备

### 选项A：使用Android模拟器（推荐新手）

#### 创建虚拟设备

1. 打开 **Android Studio**
2. 选择 **Tools → Device Manager**
3. 点击 **Create Device**
4. 选择设备类型（推荐 Pixel 6）
5. 选择系统镜像（推荐 API 34+）
6. 完成配置

#### 启动模拟器

1. 在 **Device Manager** 中找到您创建的设备
2. 点击启动按钮（三角形图标）
3. 等待模拟器启动（通常需要1-2分钟）

### 选项B：使用真实Android设备

#### 启用USB调试

1. 在Android设备上打开 **设置**
2. 进入 **关于手机**
3. 连续点击 **版本号** 7次，启用开发者选项
4. 返回设置，进入 **开发者选项**
5. 启用 **USB调试**

#### 连接设备

1. 使用USB线连接设备到电脑
2. 在设备上允许USB调试
3. 在Android Studio中，设备应该会自动显示在 **Device Manager** 中

---

## ▶️ 构建和运行应用

### 方式1：使用Android Studio（推荐）

#### 运行调试版本

1. 在Android Studio中选择目标设备
2. 点击 **Run → Run 'app'** 或按 **Shift + F10**
3. 等待构建完成
4. 应用将在设备/模拟器上启动

#### 运行发布版本

1. 选择 **Build → Build Bundles / APK → Build APK(s)**
2. 等待构建完成
3. APK文件位置：`android/app/build/outputs/apk/release/app-release.apk`

### 方式2：使用命令行

```bash
# 构建并运行调试版本
cd android
./gradlew assembleDebug

# 或使用Gradle Wrapper
# Windows: gradlew.bat assembleDebug

# 安装到设备
adb install android/app/build/outputs/apk/debug/app-debug.apk

# 启动应用
adb shell am start -n space.manus.admin.assistant.t20260111051820/.MainActivity
```

---

## 🔧 项目结构说明

### 核心目录

```
admin-assistant-fixed/
├── android/                    # ✅ Android原生项目
│   ├── app/                    # 应用模块
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/       # Kotlin源代码
│   │   │   │   ├── res/        # 资源文件
│   │   │   │   └── AndroidManifest.xml
│   │   │   ├── debug/
│   │   │   └── debugOptimized/
│   │   ├── build.gradle        # 应用级配置
│   │   └── proguard-rules.pro  # 代码混淆规则
│   ├── gradle/                 # Gradle包装器
│   ├── build.gradle            # 项目级配置
│   ├── settings.gradle         # 项目设置
│   ├── gradlew                 # 构建脚本
│   └── gradle.properties       # Gradle属性
│
├── app/                        # React Native应用
│   ├── (tabs)/                 # Tab导航页面
│   ├── dev/                    # 开发页面
│   ├── oauth/                  # OAuth认证
│   ├── vulnerability/          # 漏洞页面
│   └── _layout.tsx             # 根布局
│
├── components/                 # UI组件
├── server/                     # Express后端服务
├── drizzle/                    # 数据库配置
├── assets/                     # 资源文件
│
├── 配置文件
│   ├── package.json            # Node.js依赖
│   ├── app.config.ts           # Expo配置
│   ├── tsconfig.json           # TypeScript配置
│   ├── babel.config.js         # Babel配置
│   ├── metro.config.js         # Metro配置
│   └── tailwind.config.js      # Tailwind配置
│
└── 文档
    ├── BUILD_INSTRUCTIONS.md
    ├── ANDROID_STUDIO_SETUP.md
    ├── PROJECT_STRUCTURE.md
    └── QUICK_START_GUIDE.md
```

---

## 💻 开发工作流

### 修改React Native代码

1. **编辑文件**
   - 修改 `app/` 或 `components/` 中的TypeScript文件
   
2. **热重载**
   - 保存文件后，应用会自动重新加载
   - 或在模拟器中按 `R` 键手动刷新

3. **查看更改**
   - 更改会立即显示在设备/模拟器上

### 修改Android原生代码

1. **编辑文件**
   - 修改 `android/app/src/main/java/` 中的Kotlin文件
   
2. **重新构建**
   - 在Android Studio中点击 **Build → Rebuild Project**
   
3. **运行应用**
   - 点击 **Run** 按钮重新运行应用

### 修改后端代码

1. **编辑文件**
   - 修改 `server/` 中的TypeScript文件
   
2. **重启服务器**
   ```bash
   pnpm dev:server
   ```

---

## 🐛 调试

### 使用Android Studio调试器

1. **设置断点**
   - 在代码中点击行号左侧设置断点

2. **启动调试**
   - 点击 **Run → Debug 'app'** 或按 **Shift + F9**

3. **调试操作**
   - **Step Over** (F10) - 执行下一行
   - **Step Into** (F11) - 进入函数
   - **Step Out** (Shift + F11) - 退出函数
   - **Resume** (F9) - 继续执行

### 查看日志

1. **打开Logcat**
   - **View → Tool Windows → Logcat**

2. **过滤日志**
   - 在搜索框中输入应用包名：`space.manus.admin.assistant`

3. **查看错误**
   - 搜索 `ERROR` 或 `Exception` 关键词

---

## 📦 构建APK进行分发

### 构建发布APK

```bash
cd android

# 构建发布版本
./gradlew assembleRelease

# 或使用Gradle Wrapper (Windows)
gradlew.bat assembleRelease
```

### 签名APK

```bash
# 生成密钥库（首次）
keytool -genkey -v -keystore my-release-key.keystore \
  -alias my-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# 签名APK
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore my-release-key.keystore \
  app-release.apk my-key-alias

# 优化APK
zipalign -v 4 app-release.apk admin-assistant-signed.apk
```

### APK位置

- **调试版本**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **发布版本**: `android/app/build/outputs/apk/release/app-release.apk`

---

## 🔐 项目配置

### 应用信息

| 项目 | 值 |
|-----|-----|
| **应用名称** | 超管助手 (Admin Assistant) |
| **包名** | space.manus.admin.assistant.t20260111051820 |
| **版本** | 1.0.0 |
| **最低SDK** | Android 5.0+ (API 21) |
| **目标SDK** | Android 14+ (API 34+) |

### 权限配置

项目已配置以下权限（在 `android/app/src/main/AndroidManifest.xml`）：

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.RECORD_AUDIO"/>
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>
<uses-permission android:name="android.permission.VIBRATE"/>
```

---

## 📚 技术栈详解

### 前端技术

| 技术 | 版本 | 用途 |
|-----|------|------|
| React | 19.1.0 | UI框架 |
| React Native | 0.81.5 | 跨平台框架 |
| Expo | 54.0.29 | 开发平台 |
| Expo Router | 6.0.19 | 路由管理 |
| NativeWind | 4.2.1 | Tailwind CSS支持 |
| TypeScript | 5.9.3 | 类型系统 |

### 后端技术

| 技术 | 版本 | 用途 |
|-----|------|------|
| Express | 4.22.1 | Web框架 |
| tRPC | 11.7.2 | RPC框架 |
| Drizzle ORM | 0.44.7 | 数据库ORM |
| MySQL2 | 3.16.0 | 数据库驱动 |
| Node.js | 18+ | 运行时环境 |

### 原生技术

| 技术 | 版本 | 用途 |
|-----|------|------|
| Kotlin | 最新 | Android编程语言 |
| Gradle | 8+ | 构建系统 |
| Android SDK | 34+ | Android开发工具 |
| JDK | 17+ | Java编译器 |

---

## 🆘 常见问题

### Q1: Gradle同步失败

**错误信息**: `Could not find com.android.tools.build:gradle`

**解决方案**:
```bash
# 清除Gradle缓存
cd android
./gradlew clean

# 重新同步
# 在Android Studio中：Build → Clean Project → Rebuild Project
```

### Q2: Java版本不兼容

**错误信息**: `Unsupported class-file format`

**解决方案**:
```bash
# 检查Java版本
java -version

# 应该是17或更高，如果不是，请安装JDK 17+
# 然后在Android Studio中设置：
# File → Project Structure → SDK Location → JDK location
```

### Q3: 模拟器无法启动

**解决方案**:
1. 检查虚拟化是否启用（BIOS设置）
2. 尝试创建新的虚拟设备
3. 清除模拟器数据：`emulator -avd <device_name> -wipe-data`

### Q4: 应用在设备上崩溃

**解决方案**:
1. 查看Logcat日志
2. 确保所有权限已授予
3. 检查网络连接
4. 清除应用数据并重新安装

### Q5: 构建超时

**错误信息**: `Gradle build timeout`

**解决方案**:
```bash
# 增加Gradle超时时间
# 在 android/gradle.properties 中添加：
org.gradle.jvmargs=-Xmx4096m
org.gradle.timeout=600000
```

---

## 📖 相关文档

项目中包含的详细文档：

| 文档 | 内容 |
|-----|------|
| **BUILD_INSTRUCTIONS.md** | 详细的构建说明和各种构建方式 |
| **ANDROID_STUDIO_SETUP.md** | Android Studio特定的配置指南 |
| **PROJECT_STRUCTURE.md** | 完整的项目结构和技术栈说明 |
| **design.md** | 应用设计文档 |
| **todo.md** | 项目待办事项 |

---

## 🎯 下一步

1. ✅ **安装前置软件** - 确保所有必需软件已安装
2. ✅ **解压项目文件** - 解压 `admin-assistant-fixed.tar.gz`
3. ✅ **安装依赖** - 运行 `pnpm install`
4. ✅ **打开Android Studio** - 打开项目目录
5. ✅ **等待Gradle同步** - 首次需要5-15分钟
6. ✅ **配置设备** - 创建虚拟设备或连接真实设备
7. ✅ **运行应用** - 点击Run按钮启动应用
8. ✅ **开始开发** - 修改代码并使用热重载

---

## 💡 开发建议

### 代码风格

- 使用TypeScript进行类型检查
- 遵循ESLint规则：`pnpm lint`
- 使用Prettier格式化代码：`pnpm format`

### 测试

```bash
# 运行单元测试
pnpm test

# 监听模式
pnpm test --watch
```

### 性能优化

- 使用React.memo优化组件
- 避免不必要的重新渲染
- 使用Hermes引擎加快启动速度

---

## 📞 获取帮助

### 官方文档

- [React Native文档](https://reactnative.dev)
- [Expo文档](https://docs.expo.dev)
- [Android Studio文档](https://developer.android.com/studio/intro)
- [Gradle文档](https://docs.gradle.org)

### 常用命令

```bash
# 清理项目
pnpm clean

# 重新安装依赖
pnpm install --force

# 检查TypeScript类型
pnpm check

# 运行linter
pnpm lint

# 格式化代码
pnpm format

# 运行测试
pnpm test
```

---

**祝您开发愉快！** 🚀

如有任何问题，请参考相关文档或查看Logcat日志获取更多信息。
