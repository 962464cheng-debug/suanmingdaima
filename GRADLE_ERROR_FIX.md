# Gradle 错误修复指南

**错误信息**: 
```
Settings file 'android/settings.gradle' line: 3
A problem occurred evaluating settings 'android'.
> Process 'command 'node'' finished with non-zero exit value 1
```

**问题描述**: Gradle 在执行 settings.gradle 时，无法找到或执行 Node.js 命令

---

## 🔍 问题原因

1. **Node.js 路径问题** - Gradle 找不到 Node.js 可执行文件
2. **环境变量未配置** - Node.js 不在系统 PATH 中
3. **依赖未安装** - 某些 npm 包未正确安装
4. **macOS 特定问题** - M1/M2 芯片或 Homebrew 安装的 Node.js 路径问题

---

## ✅ 解决方案

### 方案1：检查 Node.js 安装（推荐）

#### 步骤1：验证 Node.js 是否已安装

```bash
# 检查 Node.js 版本
node --version

# 检查 npm 版本
npm --version

# 检查 Node.js 路径
which node
```

**预期输出**:
```
v18.0.0  (或更高版本)
9.0.0    (或更高版本)
/usr/local/bin/node  (或 /opt/homebrew/bin/node)
```

#### 步骤2：如果 Node.js 未安装

**使用 Homebrew（推荐）**:
```bash
# 安装 Homebrew（如果未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Node.js
brew install node

# 验证安装
node --version
npm --version
```

**或使用 nvm（Node Version Manager）**:
```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载 shell 配置
source ~/.zshrc  # 或 source ~/.bash_profile

# 安装 Node.js
nvm install 18
nvm use 18

# 验证安装
node --version
```

---

### 方案2：配置 Android Studio 环境变量

#### 步骤1：打开 Android Studio

1. 打开 Android Studio
2. 进入菜单：**Android Studio → Preferences**（macOS）或 **File → Settings**（Windows/Linux）

#### 步骤2：配置 Gradle 环境

1. 搜索 "Gradle"
2. 点击 **Build, Execution, Deployment → Gradle**
3. 在 **Gradle JDK** 下拉菜单中，选择 **JDK 17** 或更高版本

#### 步骤3：配置 Node.js 路径

1. 搜索 "Node"
2. 点击 **Languages & Frameworks → Node.js and NPM**
3. 在 **Node interpreter** 中，设置 Node.js 的完整路径

**获取 Node.js 路径**:
```bash
which node
```

**输出示例**:
```
/usr/local/bin/node
# 或
/opt/homebrew/bin/node
```

将此路径粘贴到 Android Studio 的 Node interpreter 字段中。

---

### 方案3：清除 Gradle 缓存

#### 步骤1：关闭 Android Studio

#### 步骤2：清除 Gradle 缓存

```bash
# 进入项目目录
cd /path/to/admin-assistant-fixed

# 清除 Gradle 缓存
cd android
./gradlew clean

# 或使用以下命令
rm -rf ~/.gradle/caches
rm -rf ~/.gradle/wrapper
```

#### 步骤3：重新打开 Android Studio

1. 打开 Android Studio
2. 打开项目
3. 等待 Gradle 同步（会重新下载依赖）

---

### 方案4：检查 settings.gradle 配置

#### 步骤1：查看 settings.gradle 第3行

```bash
cd /path/to/admin-assistant-fixed/android
head -10 settings.gradle
```

**预期内容**:
```gradle
pluginManagement {
  def reactNativeGradlePlugin = new File(
    providers.exec {
      workingDir(rootDir)
      commandLine("node", "--print", "require.resolve('@react-native/gradle-plugin/package.json', ...
```

#### 步骤2：如果 Node.js 命令失败

可能是因为 Node.js 不在 PATH 中。尝试以下方法：

**编辑 settings.gradle**:

在文件开头添加以下代码来指定 Node.js 路径：

```gradle
// 在 pluginManagement 块之前添加
def getNodePath() {
    def nodeExec = System.getenv("NODE_EXECUTABLE")
    if (nodeExec) return nodeExec
    
    // 尝试常见的 Node.js 路径
    def possiblePaths = [
        "/usr/local/bin/node",
        "/opt/homebrew/bin/node",
        "/usr/bin/node",
        System.getenv("NVM_DIR") ? "${System.getenv("NVM_DIR")}/versions/node/v18.0.0/bin/node" : null
    ]
    
    for (path in possiblePaths) {
        if (path && new File(path).exists()) {
            return path
        }
    }
    
    return "node"  // 默认使用 PATH 中的 node
}

def nodePath = getNodePath()
println("Using Node.js: $nodePath")
```

然后在 `commandLine` 中使用 `nodePath`:

```gradle
commandLine(nodePath, "--print", "require.resolve('@react-native/gradle-plugin/package.json', ...
```

---

### 方案5：使用环境变量

#### 步骤1：设置 NODE_EXECUTABLE 环境变量

```bash
# 获取 Node.js 路径
NODE_PATH=$(which node)
echo $NODE_PATH

# 设置环境变量
export NODE_EXECUTABLE=$NODE_PATH

# 验证
echo $NODE_EXECUTABLE
```

#### 步骤2：在 Android Studio 中设置

1. 打开 Terminal（在 Android Studio 中）
2. 运行以下命令：
```bash
export NODE_EXECUTABLE=$(which node)
```

#### 步骤3：重新打开项目

关闭并重新打开 Android Studio，使环境变量生效。

---

## 🔧 完整的解决步骤（推荐）

### 步骤1：验证 Node.js

```bash
# 检查 Node.js 版本
node --version

# 如果未安装，使用 Homebrew 安装
brew install node

# 验证安装
node --version
npm --version
```

### 步骤2：验证项目依赖

```bash
cd /path/to/admin-assistant-fixed

# 安装依赖
pnpm install

# 验证 expo 和相关包
ls -la node_modules/@react-native/gradle-plugin
ls -la node_modules/expo-modules-autolinking
```

### 步骤3：清除 Gradle 缓存

```bash
cd android

# 清除 Gradle 缓存
./gradlew clean

# 或
rm -rf ~/.gradle/caches
rm -rf ~/.gradle/wrapper
```

### 步骤4：在 Android Studio 中重新同步

1. 打开 Android Studio
2. 打开项目
3. 点击 **File → Sync Now**
4. 等待同步完成

### 步骤5：验证构建

```bash
cd android

# 运行 Gradle 检查
./gradlew check

# 或构建 APK
./gradlew assembleDebug
```

---

## 🎯 快速修复清单

- [ ] 检查 Node.js 是否已安装：`node --version`
- [ ] 检查 Node.js 路径：`which node`
- [ ] 在 Android Studio 中配置 Node.js 路径
- [ ] 清除 Gradle 缓存：`./gradlew clean`
- [ ] 重新安装项目依赖：`pnpm install`
- [ ] 在 Android Studio 中同步 Gradle：**File → Sync Now**
- [ ] 验证构建：`./gradlew check`

---

## 📞 如果问题仍未解决

### 收集诊断信息

```bash
# 1. 检查 Node.js
node --version
which node

# 2. 检查 npm
npm --version
which npm

# 3. 检查 pnpm
pnpm --version
which pnpm

# 4. 检查 Gradle
cd android
./gradlew --version

# 5. 检查 Java
java -version

# 6. 查看详细的 Gradle 错误
cd android
./gradlew clean --info 2>&1 | tail -100
```

### 常见错误和解决方案

| 错误 | 原因 | 解决方案 |
|-----|------|--------|
| `command 'node' not found` | Node.js 不在 PATH 中 | 安装 Node.js 或配置 PATH |
| `Cannot find module '@react-native/gradle-plugin'` | npm 依赖未安装 | 运行 `pnpm install` |
| `JAVA_HOME not set` | Java 未配置 | 安装 JDK 17+ |
| `Gradle wrapper not found` | Gradle 文件缺失 | 重新生成 Android 项目 |

---

## 🚀 验证修复成功

修复成功后，应该看到：

```bash
$ cd android && ./gradlew check
> Task :app:lint
> Task :app:compileDebugKotlin
> Task :app:compileDebugJava
...
BUILD SUCCESSFUL in 2m 30s
```

---

## 📖 相关文档

- [Android Studio 官方文档](https://developer.android.com/studio)
- [Gradle 官方文档](https://gradle.org/docs/)
- [React Native Gradle 插件](https://github.com/facebook/react-native/tree/main/packages/react-native-gradle-plugin)
- [Expo 文档](https://docs.expo.dev/)

---

**祝您修复顺利！** 🚀
