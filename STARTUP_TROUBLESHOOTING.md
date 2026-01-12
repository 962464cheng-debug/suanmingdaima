# 应用启动问题诊断指南

## 📱 问题描述

应用无法打开，一直停留在启动画面，没有任何错误提示。

---

## 🔍 问题诊断

### 常见原因

| 原因 | 症状 | 解决方案 |
|-----|------|--------|
| **API服务器未配置** | 启动画面停留，无错误 | 配置 `EXPO_PUBLIC_API_BASE_URL` |
| **网络连接问题** | 启动缓慢或超时 | 检查网络，配置超时 |
| **权限未授予** | 某些功能不可用 | 手动授予应用权限 |
| **环境变量缺失** | 初始化失败 | 创建 `.env` 文件 |
| **依赖未安装** | 模块找不到错误 | 运行 `pnpm install` |

---

## 🛠️ 修复步骤

### 步骤1：检查日志

#### 在Android设备上查看日志

```bash
# 连接设备，打开Android Studio

# 1. 打开Logcat窗口
# View → Tool Windows → Logcat

# 2. 过滤日志
# 搜索包名：space.manus.admin.assistant

# 3. 查看错误
# 搜索关键词：ERROR, Exception, Crash
```

#### 查看应用日志

应用已添加详细的调试日志，查找以下前缀：

- `[AppInit]` - 应用初始化日志
- `[tRPC]` - API客户端日志
- `[ManusRuntime]` - 运行时日志

### 步骤2：配置环境变量

#### 创建 `.env` 文件

```bash
cd admin-assistant-fixed

# 复制示例文件
cp .env.example .env

# 编辑 .env 文件
nano .env
```

#### 配置API服务器地址

**本地开发**:
```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000
```

**远程服务器**:
```env
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
```

**在Manus沙箱中**:
```env
# 如果后端服务运行在3000端口
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000
```

### 步骤3：重新构建应用

```bash
# 清除缓存
cd android
./gradlew clean

# 重新构建
./gradlew assembleDebug

# 或在Android Studio中
# Build → Clean Project → Rebuild Project
```

### 步骤4：重新安装应用

```bash
# 卸载旧版本
adb uninstall space.manus.admin.assistant.t20260111051820

# 安装新版本
adb install android/app/build/outputs/apk/debug/app-debug.apk

# 或在Android Studio中
# Run → Run 'app'
```

---

## 🔧 应用修复内容

### 已添加的改进

✅ **错误处理**
- 添加try-catch块捕获初始化错误
- 显示友好的错误提示

✅ **延迟初始化**
- 使用setTimeout延迟初始化
- 防止阻塞UI线程

✅ **加载屏幕**
- 显示"Loading..."提示
- 用户知道应用正在启动

✅ **超时机制**
- API请求30秒超时
- 防止请求无限挂起

✅ **调试日志**
- 详细的时间戳日志
- 便于问题诊断

### 修复的文件

| 文件 | 修改内容 |
|-----|--------|
| `app/_layout.tsx` | 添加错误处理、加载屏幕、调试日志 |
| `lib/trpc.ts` | 添加超时机制、错误处理、详细日志 |
| `.env.example` | 环境变量配置示例 |

---

## 📋 检查清单

在运行应用前，请确保：

- [ ] 已安装所有前置软件（Node.js、pnpm、Android Studio、JDK 17+）
- [ ] 已运行 `pnpm install` 安装依赖
- [ ] 已创建 `.env` 文件并配置 `EXPO_PUBLIC_API_BASE_URL`
- [ ] 已配置模拟器或连接真实设备
- [ ] 已授予应用必要的权限
- [ ] 网络连接正常
- [ ] 后端API服务器正在运行（如果需要）

---

## 🔍 详细诊断步骤

### 问题1：应用启动后立即崩溃

**症状**: 应用打开后立即闪退

**诊断**:
```bash
# 查看Logcat日志
adb logcat | grep -i "crash\|exception\|error"

# 查看应用特定日志
adb logcat | grep "space.manus.admin.assistant"
```

**解决方案**:
1. 清除应用数据：`adb shell pm clear space.manus.admin.assistant.t20260111051820`
2. 重新安装应用
3. 检查权限是否已授予

### 问题2：应用启动缓慢

**症状**: 应用启动需要很长时间

**诊断**:
- 检查网络连接
- 查看API服务器是否响应
- 检查是否有网络请求超时

**解决方案**:
```bash
# 测试API连接
curl -v http://localhost:3000/api/trpc

# 如果无法连接，检查后端服务是否运行
ps aux | grep node
```

### 问题3：显示"Initialization Error"

**症状**: 应用显示初始化错误信息

**诊断**:
- 记下错误信息
- 查看Logcat日志获取详细信息

**解决方案**:
1. 检查环境变量配置
2. 确保API服务器地址正确
3. 检查网络连接
4. 查看后端服务日志

### 问题4：权限相关错误

**症状**: 应用请求权限但被拒绝

**解决方案**:
1. 打开设备设置
2. 进入应用权限管理
3. 为应用授予必要的权限：
   - 麦克风
   - 存储
   - 通知
   - 录音

---

## 📊 调试技巧

### 启用详细日志

应用已启用详细日志，查看以下内容：

```javascript
// 在console中搜索
[AppInit]      // 应用初始化日志
[tRPC]         // API客户端日志
[ManusRuntime] // 运行时日志
```

### 使用Chrome DevTools调试（Web版本）

```bash
# 如果运行web版本
# 打开Chrome DevTools (F12)
# 查看Console标签
# 搜索上述日志前缀
```

### 使用Android Studio调试器

1. 在代码中设置断点
2. 运行 Debug 模式：**Run → Debug 'app'**
3. 使用调试器逐步执行代码

---

## 🌐 网络配置

### 本地开发环境

```bash
# 启动后端服务
cd admin-assistant-fixed
pnpm dev:server

# 后端服务运行在 http://localhost:3000
# 在 .env 中配置：
# EXPO_PUBLIC_API_BASE_URL=http://localhost:3000
```

### 真实设备连接本地服务器

```bash
# 获取电脑IP地址
# macOS/Linux
ifconfig | grep "inet "

# Windows
ipconfig

# 在 .env 中配置（将 192.168.x.x 替换为您的IP）：
# EXPO_PUBLIC_API_BASE_URL=http://192.168.x.x:3000
```

### 远程服务器

```bash
# 在 .env 中配置远程API地址：
# EXPO_PUBLIC_API_BASE_URL=https://api.example.com
```

---

## 📞 获取更多帮助

### 查看相关文档

- `QUICK_START_GUIDE.md` - 快速开始指南
- `ANDROID_STUDIO_SETUP.md` - Android Studio设置
- `BUILD_INSTRUCTIONS.md` - 构建说明
- `PROJECT_STRUCTURE.md` - 项目结构

### 常用命令

```bash
# 清除所有缓存
pnpm clean
rm -rf node_modules
pnpm install

# 查看应用日志
adb logcat | grep "space.manus.admin.assistant"

# 清除应用数据
adb shell pm clear space.manus.admin.assistant.t20260111051820

# 卸载应用
adb uninstall space.manus.admin.assistant.t20260111051820

# 查看已连接的设备
adb devices

# 重启ADB服务
adb kill-server
adb start-server
```

---

## ✅ 验证修复

修复完成后，应该看到：

1. ✅ 应用启动时显示"Loading..."
2. ✅ 应用成功加载主界面
3. ✅ Logcat中显示详细的初始化日志
4. ✅ 没有崩溃或错误信息

---

## 🎯 下一步

1. 按照上述步骤进行诊断
2. 根据错误信息采取相应措施
3. 重新构建和安装应用
4. 验证应用是否正常运行

如果问题仍未解决，请：
1. 收集详细的日志信息
2. 检查所有环境变量配置
3. 确保所有前置软件已正确安装
4. 参考相关文档获取更多帮助

---

**祝您调试顺利！** 🚀
