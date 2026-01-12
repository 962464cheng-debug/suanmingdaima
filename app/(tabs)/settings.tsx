import { ScrollView, Text, View, TouchableOpacity, Switch, Alert } from "react-native";
import { useState } from "react";
import * as Haptics from "expo-haptics";

import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function SettingsScreen() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [logRetentionDays, setLogRetentionDays] = useState(7);
  const [autoBackup, setAutoBackup] = useState(false);

  const handleDarkModeToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsDarkMode(!isDarkMode);
    Alert.alert("提示", "深色模式切换功能将在后续版本中实现");
  };

  const handleAutoBackupToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setAutoBackup(!autoBackup);
  };

  const handleTargetAppConfig = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      "目标应用配置",
      "当前目标：com.leyou.ruianmahjong\n版本：2.3.5\n\n此功能将在后续版本中支持自定义配置。",
      [{ text: "确定", style: "default" }]
    );
  };

  const handleLogRetention = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      "日志保留设置",
      "选择日志保留天数：",
      [
        { text: "3天", onPress: () => setLogRetentionDays(3) },
        { text: "7天", onPress: () => setLogRetentionDays(7) },
        { text: "15天", onPress: () => setLogRetentionDays(15) },
        { text: "30天", onPress: () => setLogRetentionDays(30) },
        { text: "取消", style: "cancel" },
      ]
    );
  };

  const handleLegalNotice = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      "法律声明",
      "超管助手 v1.0.0\n\n本工具仅用于教育和安全研究目的。\n\n✓ 允许用途：\n• 教育和安全研究\n• 自有应用的安全测试\n• 企业设备管理\n• 漏洞验证和修复\n\n✗ 禁止用途：\n• 未授权访问他人应用\n• 数据窃取\n• 支付欺诈\n• 任何非法目的\n\n使用者需自行承担所有法律责任。开发者不对滥用行为负责。",
      [{ text: "我已知晓", style: "default" }]
    );
  };

  const handleAbout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      "关于超管助手",
      "版本：1.0.0\n构建日期：2026-01-11\n\n超管助手是一款用于教育和安全研究的移动应用管理工具，帮助安全研究人员验证和修复应用漏洞。\n\n基于漏洞数据开发，针对麻将游戏应用(com.leyou.ruianmahjong v2.3.5)的20多个安全漏洞进行测试和验证。",
      [{ text: "确定", style: "default" }]
    );
  };

  const handleClearCache = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "清除缓存",
      "确定要清除所有缓存数据吗？这将删除所有拦截记录和日志。",
      [
        { text: "取消", style: "cancel" },
        {
          text: "确定",
          style: "destructive",
          onPress: () => {
            Alert.alert("成功", "缓存已清除");
          },
        },
      ]
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
        <View className="items-center gap-2 pt-4 pb-2">
          <Text className="text-3xl font-bold text-foreground">设置</Text>
          <Text className="text-sm text-muted text-center">
            应用配置与系统设置
          </Text>
        </View>

        {/* General Settings */}
        <View className="gap-3">
          <Text className="text-base font-semibold text-foreground">通用设置</Text>
          
          {/* Target App Config */}
          <TouchableOpacity
            onPress={handleTargetAppConfig}
            activeOpacity={0.7}
          >
            <View className="bg-surface rounded-2xl p-4 border border-border flex-row items-center justify-between">
              <View className="flex-row items-center gap-3 flex-1">
                <View className="w-10 h-10 rounded-xl bg-primary/20 items-center justify-center">
                  <IconSymbol name="gear" size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium text-foreground">目标应用配置</Text>
                  <Text className="text-xs text-muted mt-1">com.leyou.ruianmahjong</Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.muted} />
            </View>
          </TouchableOpacity>

          {/* Dark Mode */}
          <View className="bg-surface rounded-2xl p-4 border border-border flex-row items-center justify-between">
            <View className="flex-row items-center gap-3 flex-1">
              <View className="w-10 h-10 rounded-xl bg-accent/20 items-center justify-center">
                <IconSymbol name="gear" size={20} color={colors.accent} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-foreground">深色模式</Text>
                <Text className="text-xs text-muted mt-1">切换应用主题</Text>
              </View>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={handleDarkModeToggle}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor={colors.background}
            />
          </View>

          {/* Log Retention */}
          <TouchableOpacity
            onPress={handleLogRetention}
            activeOpacity={0.7}
          >
            <View className="bg-surface rounded-2xl p-4 border border-border flex-row items-center justify-between">
              <View className="flex-row items-center gap-3 flex-1">
                <View className="w-10 h-10 rounded-xl bg-info/20 items-center justify-center">
                  <IconSymbol name="doc.text" size={20} color={colors.info} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium text-foreground">日志保留</Text>
                  <Text className="text-xs text-muted mt-1">保留{logRetentionDays}天</Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.muted} />
            </View>
          </TouchableOpacity>

          {/* Auto Backup */}
          <View className="bg-surface rounded-2xl p-4 border border-border flex-row items-center justify-between">
            <View className="flex-row items-center gap-3 flex-1">
              <View className="w-10 h-10 rounded-xl bg-success/20 items-center justify-center">
                <IconSymbol name="checkmark.circle" size={20} color={colors.success} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-medium text-foreground">自动备份</Text>
                <Text className="text-xs text-muted mt-1">自动备份拦截记录</Text>
              </View>
            </View>
            <Switch
              value={autoBackup}
              onValueChange={handleAutoBackupToggle}
              trackColor={{ false: colors.border, true: colors.success }}
              thumbColor={colors.background}
            />
          </View>
        </View>

        {/* Data Management */}
        <View className="gap-3">
          <Text className="text-base font-semibold text-foreground">数据管理</Text>
          
          {/* Clear Cache */}
          <TouchableOpacity
            onPress={handleClearCache}
            activeOpacity={0.7}
          >
            <View className="bg-surface rounded-2xl p-4 border border-border flex-row items-center justify-between">
              <View className="flex-row items-center gap-3 flex-1">
                <View className="w-10 h-10 rounded-xl bg-error/20 items-center justify-center">
                  <IconSymbol name="xmark.circle" size={20} color={colors.error} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium text-foreground">清除缓存</Text>
                  <Text className="text-xs text-muted mt-1">删除所有拦截记录和日志</Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.muted} />
            </View>
          </TouchableOpacity>
        </View>

        {/* About */}
        <View className="gap-3">
          <Text className="text-base font-semibold text-foreground">关于</Text>
          
          {/* Legal Notice */}
          <TouchableOpacity
            onPress={handleLegalNotice}
            activeOpacity={0.7}
          >
            <View className="bg-surface rounded-2xl p-4 border border-border flex-row items-center justify-between">
              <View className="flex-row items-center gap-3 flex-1">
                <View className="w-10 h-10 rounded-xl bg-warning/20 items-center justify-center">
                  <IconSymbol name="exclamationmark.triangle" size={20} color={colors.warning} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium text-foreground">法律声明</Text>
                  <Text className="text-xs text-muted mt-1">使用条款和责任声明</Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.muted} />
            </View>
          </TouchableOpacity>

          {/* About */}
          <TouchableOpacity
            onPress={handleAbout}
            activeOpacity={0.7}
          >
            <View className="bg-surface rounded-2xl p-4 border border-border flex-row items-center justify-between">
              <View className="flex-row items-center gap-3 flex-1">
                <View className="w-10 h-10 rounded-xl bg-primary/20 items-center justify-center">
                  <IconSymbol name="info.circle" size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-medium text-foreground">关于超管助手</Text>
                  <Text className="text-xs text-muted mt-1">版本 1.0.0</Text>
                </View>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.muted} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Bottom Spacing */}
        <View className="h-4" />
      </ScrollView>
    </ScreenContainer>
  );
}
