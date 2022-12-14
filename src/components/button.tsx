import React, {type PropsWithChildren} from 'react';
import {
  TouchableOpacity,
  View,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from 'react-native';

interface ButtonApp extends TouchableOpacityProps {
  children: string;
  isLoading?: boolean;
  className?: string;
}

const Button: React.FC<PropsWithChildren<ButtonApp>> = ({
  children,
  className,
  isLoading,
  ...props
}) => {
  return (
    <View className="w-full">
      <TouchableOpacity
        {...props}
        className={`flex-row bg-primary-default h-11 justify-center items-center rounded-md shadow-md ${className}`}>
        {isLoading && <ActivityIndicator color="#FFFFFF" className="mr-2" />}
        <Text className="font-heading text-xl text-center text-white">
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
