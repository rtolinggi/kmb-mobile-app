import React, {useState, type PropsWithChildren} from 'react';
import {TextInput, View, TextInputProps, Text} from 'react-native';

interface InputApp extends TextInputProps {
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperStyle?: string;
  isError?: React.ReactNode;
}

const FormInput: React.FC<PropsWithChildren<InputApp>> = ({
  label,
  className,
  rightIcon,
  leftIcon,
  wrapperStyle,
  isError,
  ...props
}) => {
  const [isTextInputFocus, setTextInputFocus] =
    useState<string>('border-neutral-200');

  return (
    <View className={`${wrapperStyle}`}>
      <Text
        className={`font-heading text-lg tracking-tighter ${
          isError ? 'text-red-400 ' : 'text-gray-500'
        }`}>
        {label}
      </Text>
      <View
        className={`flex-row w-full items-center border-b-2 ${isTextInputFocus} ${
          !isError ? isTextInputFocus : 'border-red-400'
        } `}>
        {leftIcon}
        <TextInput
          cursorColor={'gray'}
          onFocus={() => setTextInputFocus('border-primary-light')}
          onBlur={() => setTextInputFocus('border-neutral-200')}
          {...props}
          className={`h-10 flex-1 text-lg text-gray-700 font-sans ${className}`}
        />
        {rightIcon}
      </View>
      {isError && <Text>{isError}</Text>}
    </View>
  );
};

export default FormInput;
