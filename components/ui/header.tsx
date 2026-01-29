import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  rightComponent?: React.ReactNode;
  subtitle?: string;
}

export default function Header({
  title,
  onBackPress,
  showBackButton = true,
  rightComponent,
  subtitle
}: HeaderProps) {
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }
  };

  return (
    <>
      
      {/* Header Container */}
      <View
        className="bg-white"
        style={{
          paddingTop: insets.top + 8,
          paddingBottom: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <View className="flex-row items-center justify-between px-4">
          {/* Left Section - Back Button */}
          <View className="flex-row items-center flex-1">
            {showBackButton && (
              <TouchableOpacity
                onPress={handleBackPress}
                className="mr-3 p-2"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons 
                  name="arrow-back" 
                  size={24} 
                  color="#374151" 
                />
              </TouchableOpacity>
            )}

            {/* Title Section */}
            <View className="flex-1">
              <Text
                className="text-xl text-gray-900 arabic-font"
                numberOfLines={1}
              >
                {title}
              </Text>
              
            
            </View>
          </View>

          {/* Right Section - Custom Component */}
          {rightComponent && (
            <View className="ml-3">
              {rightComponent}
            </View>
          )}
        </View>
      </View>

      {/* Bottom Border Line */}
      <View className="h-px bg-gray-100" />
    </>
  );
}
