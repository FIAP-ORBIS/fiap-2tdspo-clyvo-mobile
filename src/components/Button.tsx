import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle } from 'react-native';
import { buttonStyles as s } from '../styles/components/button.styles';
import { COLORS } from '../styles/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({ title, onPress, variant = 'primary', loading, disabled, style }: ButtonProps) {
  const btnStyle = s[variant];
  const textStyle =
    variant === 'primary' ? s.textPrimary
    : variant === 'secondary' ? s.textSecondary
    : variant === 'outline' ? s.textOutline
    : s.textGhost;

  const indicatorColor =
    variant === 'primary' ? '#fff' : COLORS.primary['500'];

  return (
    <TouchableOpacity
      style={[btnStyle, disabled && s.disabled, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading
        ? <ActivityIndicator color={indicatorColor} />
        : <Text style={textStyle}>{title}</Text>}
    </TouchableOpacity>
  );
}

export default Button;
