import { ReactNode } from "react";
import { View } from "react-native";
import type { ViewProps } from "react-native";

interface Props extends ViewProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "", ...props }: Props) {
  return (
    <View
      className={`bg-surface border border-border rounded-xl p-4 ${className}`.trim()}
      {...props}
    >
      {children}
    </View>
  );
}
