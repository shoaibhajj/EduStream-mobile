// app/(onboarding)/index.tsx

import React, { useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  I18nManager,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { AppText } from "../../components/ui/AppText";
import { PrimaryButton } from "../../components/ui/PrimaryButton";

import { Colors } from "../../constants/colors";
import { Radius, Spacing, FontSize, FontWeight } from "../../constants/design";

import { t } from "../../lib/i18n";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SLIDES = [
  {
    key: "1",
    bg: Colors.accentLight,
    icon: "📚",
    titleKey: "onboarding.slide1.title",
    subtitleKey: "onboarding.slide1.subtitle",
  },
  {
    key: "2",
    bg: Colors.ctaLight,
    icon: "▶️",
    titleKey: "onboarding.slide2.title",
    subtitleKey: "onboarding.slide2.subtitle",
  },
  {
    key: "3",
    bg: Colors.previewLight,
    icon: "🎓",
    titleKey: "onboarding.slide3.title",
    subtitleKey: "onboarding.slide3.subtitle",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();

  const [index, setIndex] = useState(0);

  const slide = SLIDES[index];
  const isLast = index === SLIDES.length - 1;

  async function finish() {
    await AsyncStorage.setItem("onboarding_done", "true");
    router.replace("/(student)/home");
  }

  function next() {
    if (isLast) {
      finish();
      return;
    }

    setIndex((prev) => prev + 1);
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <Pressable onPress={finish} hitSlop={12} style={styles.skip}>
        <AppText style={styles.skipLabel}>{t("onboarding.skip")}</AppText>
      </Pressable>

      <View style={styles.content}>
        <Animated.View
          key={slide.key}
          entering={FadeIn.duration(250)}
          exiting={FadeOut.duration(250)}
          style={[
            styles.slide,
            {
              backgroundColor: slide.bg,
            },
          ]}
        >
          <AppText style={styles.appTitle}>{t("common.app_name")}</AppText>

          <View style={styles.iconWrap}>
            <AppText style={styles.slideIcon}>{slide.icon}</AppText>
          </View>

          <AppText style={styles.slideTitle}>{t(slide.titleKey)}</AppText>

          <AppText style={styles.slideSubtitle}>{t(slide.subtitleKey)}</AppText>
        </Animated.View>
      </View>

      <View style={styles.bottom}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>

        <PrimaryButton
          label={isLast ? t("onboarding.start_now") : t("onboarding.next")}
          onPress={next}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  skip: {
    position: "absolute",
    top: 52,
    left: I18nManager.isRTL ? Spacing.xl : undefined,
    right: I18nManager.isRTL ? undefined : Spacing.xl,
    zIndex: 10,

    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,

    minWidth: 44,
    minHeight: 44,

    alignItems: "center",
    justifyContent: "center",
  },

  skipLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },

  content: {
    flex: 1,
  },

  slide: {
    flex: 1,
    width: SCREEN_WIDTH,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: Spacing["2xl"],
    paddingTop: 60,
  },

  appTitle: {
    fontSize: FontSize["2xl"],
    fontWeight: FontWeight.bold,
    color: Colors.accent,

    textAlign: "center",

    marginBottom: Spacing["2xl"],

    paddingTop: 30,
    paddingBottom: 30,
  },

  iconWrap: {
    width: 132,
    height: 132,
    borderRadius: 66,

    backgroundColor: Colors.surface,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: Spacing.xl,

    shadowColor: "#1C1917",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  slideIcon: {
    fontSize: 52,
    lineHeight: 58,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },

  slideTitle: {
    fontSize: FontSize["2xl"],
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,

    textAlign: "center",

    marginBottom: Spacing.md,

    lineHeight: 34,
  },

  slideSubtitle: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,

    textAlign: "center",

    lineHeight: 24,
  },

  bottom: {
    backgroundColor: Colors.background,

    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing["2xl"],

    gap: Spacing.lg,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.sm,
  },

  dot: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: Colors.border,
  },

  dotActive: {
    width: 24,
    backgroundColor: Colors.accent,
  },
});
