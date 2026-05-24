import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { inputStyles as s } from '../styles/components/input.styles';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  showToggle?: boolean;
}

export function Input({ label, error, showToggle, secureTextEntry, style, ...props }: InputProps) {
  const [hidden, setHidden] = useState(secureTextEntry ?? false);
  const [focused, setFocused] = useState(false);

  return (
    <View style={s.wrapper}>
      {label && <Text style={s.label}>{label}</Text>}
      <View>
        <TextInput
          style={[s.input, focused && s.inputFocused, error ? s.inputError : null, style]}
          secureTextEntry={hidden}
          placeholderTextColor="#B0B0B0"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
        {showToggle && (
          <TouchableOpacity style={s.toggle} onPress={() => setHidden(h => !h)}>
            <Text style={s.toggleText}>{hidden ? 'Ver' : 'Ocultar'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={s.error}>{error}</Text>}
    </View>
  );
}

export default Input;
