import { api } from './api';
import { salvarUsuario, salvarToken } from '../data/storage';
import { ILoginRequest, ILoginResponse, ISignupTutorRequest, ISignupVetRequest, ISignupClinicRequest, IUser } from '../interfaces/IUser';

export async function loginMock(email: string, nome: string = 'Marina', tipo: IUser['tipo'] = 'tutor'): Promise<IUser> {
  const usuario: IUser = { id: 'usr_' + Date.now(), nome, email, tipo, token: 'mock_token' };
  await salvarUsuario(usuario);
  await salvarToken('mock_token');
  return usuario;
}

export async function login(payload: ILoginRequest): Promise<ILoginResponse> {
  const { data } = await api.post<ILoginResponse>('/auth/login', payload);
  await salvarUsuario(data.usuario);
  await salvarToken(data.token);
  return data;
}

export async function signupTutor(payload: ISignupTutorRequest): Promise<ILoginResponse> {
  const { data } = await api.post<ILoginResponse>('/auth/signup/tutor', payload);
  await salvarUsuario(data.usuario);
  await salvarToken(data.token);
  return data;
}

export async function signupVet(payload: ISignupVetRequest): Promise<ILoginResponse> {
  const { data } = await api.post<ILoginResponse>('/auth/signup/vet', payload);
  await salvarUsuario(data.usuario);
  await salvarToken(data.token);
  return data;
}

export async function signupClinic(payload: ISignupClinicRequest): Promise<ILoginResponse> {
  const { data } = await api.post<ILoginResponse>('/auth/signup/clinic', payload);
  await salvarUsuario(data.usuario);
  await salvarToken(data.token);
  return data;
}
