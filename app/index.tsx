import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import { SplashScreen } from '../src/screens/auth/SplashScreen';

export default function Index() {
  const { usuario, carregando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!carregando) {
      const t = setTimeout(() => {
        if (!usuario) {
          router.replace('/auth/welcome');
        } else if (usuario.tipo === 'tutor') {
          router.replace('/(tutor)/home');
        } else if (usuario.tipo === 'vet') {
          router.replace('/(vet)/home');
        } else {
          router.replace('/(clinic)/dashboard');
        }
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [carregando, usuario]);

  return <SplashScreen />;
}
