import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { splashStyles as s } from '../../styles/auth/splash.styles';

export function SplashScreen() {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => router.replace('/auth/welcome'), 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />
      <View style={s.ellipseTopLeft} />
      <View style={s.ellipseBottomRight} />
      <View style={s.content}>
        <Text style={s.title}>ORBIS</Text>
        <Text style={s.subtitle}>o universo do seu pet</Text>
      </View>
    </View>
  );
}

export default SplashScreen;
