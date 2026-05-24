import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IUser } from '../interfaces/IUser';
import { salvarUsuario, getUsuario, removerUsuario, removerToken, checkAndMigrateStorage } from '../data/storage';

interface AuthContextData {
  usuario: IUser | null;
  carregando: boolean;
  autenticado: boolean;
  entrar: (usuario: IUser) => Promise<void>;
  atualizarUsuario: (dados: Partial<IUser>) => Promise<void>;
  sair: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<IUser | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    checkAndMigrateStorage().then(() =>
      getUsuario().then(u => {
        setUsuario(u);
        setCarregando(false);
      })
    );
  }, []);

  async function entrar(u: IUser) {
    setUsuario(u);
    await salvarUsuario(u);
  }

  async function atualizarUsuario(dados: Partial<IUser>) {
    if (!usuario) return;
    const atualizado: IUser = { ...usuario, ...dados };
    setUsuario(atualizado);
    await salvarUsuario(atualizado);
  }

  async function sair() {
    setUsuario(null);
    await removerUsuario();
    await removerToken();
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando, autenticado: !!usuario, entrar, atualizarUsuario, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
