import React from "react";
import { View, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: "home-outline",
  "offers/index": "gift-outline",
  "cart/index": "cart-outline",
  "notifications/index": "notifications-outline",
  "account/index": "person-outline",
};

export default function BottomNavigation({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View
      className="flex-row items-center justify-around h-20 border-t border-gray-200 bg-white"
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;

        const icon = icons[route.name] ?? "ellipse-outline";

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const { options } = descriptors[route.key];

        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : typeof options.title === "string"
            ? options.title
            : route.name;

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center"
          >
            <Ionicons
              name={icon}
              size={24}
              color={focused ? "#fd4a12" : "#888"}
            />

            <Text
              className={`mt-1 text-xs ${
                focused ? "text-orange-500" : "text-gray-400"
              }`}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}