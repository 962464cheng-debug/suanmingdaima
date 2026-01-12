import { ScrollView, Text, View, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

interface FeatureModule {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  route: string;
}

export default function HomeScreen() {
  const colors = useColors();
  const [targetApp] = useState({
    packageName: "com.leyou.ruianmahjong",
    version: "2.3.5",
    appName: "麻将游戏",
    isInstalled: false,
  });

  const [vulnerabilityStats] = useState({
    total: 20,
    network: 4,
    credentials: 4,
    components: 3,
    storage: 2,
    permissions: 5,
    payment: 2,
    codeExecution: 0,
    others: 0,
  });

  const featureModules: FeatureModule[] = [
    {
      id: "network",
      title: "网络监控",
      description: "拦截和修改HTTP/HTTPS请求",
      icon: "network",
      color: colors.accent,
      route: "/network",
    },
    {
      id: "data",
      title: "数据透视",
      description: "查看和编辑应用数据",
      icon: "database",
      color: colors.info,
      route: "/data",
    },
    {
      id: "permission",
      title: "权限管理",
      description: "监控和管理应用权限",
      icon: "shield",
      color: colors.success,
      route: "/permission",
    },
    {
      id: "payment",
      title: "支付破解",
      description: "拦截和伪造支付结果",
      icon: "payment",
      color: colors.warning,
      route: "/payment",
    },
    {
      id: "component",
      title: "组件管理",
      description: "查看和启动导出组件",
      icon: "widgets",
      color: colors.primary,
      route: "/component",
    },
    {
      id: "credential",
      title: "凭证提取",
      description: "提取硬编码API密钥",
      icon: "key",
      color: colors.error,
      route: "/credential",
    },
    {
      id: "script",
      title: "脚本注入",
      description: "注入和执行Lua脚本",
      icon: "code.script",
      color: "#8B5CF6",
      route: "/script",
    },
    {
      id: "log",
      title: "日志分析",
      description: "实时查看应用日志",
      icon: "doc.text",
      color: "#EC4899",
      route: "/log",
    },
  ];

  const handleFeaturePress = (module: FeatureModule) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/vulnerability/${module.id}`);
  };

  const handleLegalNotice = () => {
    Alert.alert(
      "法律声明",
      "本工具仅用于教育和安全研究目的。\n\n禁止用于：\n• 未授权访问他人应用\n• 数据窃取\n• 支付欺诈\n• 任何非法目的\n\n使用者需自行承担所有法律责任。",
      [{ text: "我已知晓", style: "default" }]
    );
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ padding: 16, gap: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="items-center gap-3 pt-4 pb-2">
          <Text className="text-3xl font-bold text-foreground">超管助手</Text>
          <Text className="text-sm text-muted text-center">
            安全研究与教育工具
          </Text>
          <TouchableOpacity
            onPress={handleLegalNotice}
            style={{ opacity: 0.7 }}
            activeOpacity={0.6}
          >
            <View className="flex-row items-center gap-1 px-3 py-1 bg-warning/10 rounded-full">
              <IconSymbol name="info.circle" size={14} color={colors.warning} />
              <Text className="text-xs text-warning font-medium">法律声明</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Target App Card */}
        <View className="bg-surface rounded-2xl p-4 border border-border shadow-sm">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-foreground">目标应用</Text>
            <View className={cn(
              "px-2 py-1 rounded-full",
              targetApp.isInstalled ? "bg-success/10" : "bg-error/10"
            )}>
              <Text className={cn(
                "text-xs font-medium",
                targetApp.isInstalled ? "text-success" : "text-error"
              )}>
                {targetApp.isInstalled ? "已安装" : "未安装"}
              </Text>
            </View>
          </View>
          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted">应用名称</Text>
              <Text className="text-sm text-foreground font-medium">{targetApp.appName}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted">包名</Text>
              <Text className="text-xs text-foreground font-mono">{targetApp.packageName}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-muted">版本</Text>
              <Text className="text-sm text-foreground font-medium">{targetApp.version}</Text>
            </View>
          </View>
        </View>

        {/* Vulnerability Stats Card */}
        <View className="bg-surface rounded-2xl p-4 border border-border shadow-sm">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-semibold text-foreground">漏洞统计</Text>
            <View className="px-3 py-1 bg-error/10 rounded-full">
              <Text className="text-lg font-bold text-error">{vulnerabilityStats.total}</Text>
            </View>
          </View>
          <View className="gap-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-muted">网络通信漏洞</Text>
              <Text className="text-sm text-foreground font-semibold">{vulnerabilityStats.network}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-muted">硬编码凭证</Text>
              <Text className="text-sm text-foreground font-semibold">{vulnerabilityStats.credentials}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-muted">导出组件</Text>
              <Text className="text-sm text-foreground font-semibold">{vulnerabilityStats.components}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-muted">数据存储漏洞</Text>
              <Text className="text-sm text-foreground font-semibold">{vulnerabilityStats.storage}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-muted">权限滥用</Text>
              <Text className="text-sm text-foreground font-semibold">{vulnerabilityStats.permissions}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-muted">支付漏洞</Text>
              <Text className="text-sm text-foreground font-semibold">{vulnerabilityStats.payment}</Text>
            </View>
          </View>
        </View>

        {/* Feature Modules Grid */}
        <View className="gap-3">
          <Text className="text-lg font-semibold text-foreground">功能模块</Text>
          <View className="flex-row flex-wrap gap-3">
            {featureModules.map((module) => (
              <TouchableOpacity
                key={module.id}
                onPress={() => handleFeaturePress(module)}
                activeOpacity={0.7}
                style={{ width: "48%" }}
              >
                <View className="bg-surface rounded-2xl p-4 border border-border shadow-sm">
                  <View 
                    className="w-12 h-12 rounded-xl items-center justify-center mb-3"
                    style={{ backgroundColor: module.color + "20" }}
                  >
                    <IconSymbol 
                      name={module.icon as any} 
                      size={24} 
                      color={module.color} 
                    />
                  </View>
                  <Text className="text-base font-semibold text-foreground mb-1">
                    {module.title}
                  </Text>
                  <Text className="text-xs text-muted leading-relaxed">
                    {module.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-4" />
      </ScrollView>
    </ScreenContainer>
  );
}
