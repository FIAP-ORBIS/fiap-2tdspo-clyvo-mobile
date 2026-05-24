export type TipoUsuario = 'tutor' | 'vet' | 'clinic';
export type TipoAtendimento = 'presencial' | 'teleconsulta' | 'ambos';

export interface IUser {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  tipo: TipoUsuario;
  foto?: string;
  // tutor
  cpf?: string;
  // vet
  crmv?: string;
  // clinic
  cnpj?: string;
  // vet + clinic: perfil de atendimento
  horarioAtendimento?: string;
  cidade?: string;
  tipoAtendimento?: TipoAtendimento;
  // interno
  senha?: string;
  token?: string;
  criadoEm?: string;
}

export interface ILoginRequest {
  email: string;
  senha: string;
}

export interface ILoginResponse {
  usuario: IUser;
  token: string;
}

export interface ISignupTutorRequest {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  senha: string;
}

export interface ISignupVetRequest {
  nome: string;
  email: string;
  crmv: string;
  senha: string;
}

export interface ISignupClinicRequest {
  nomeClinica: string;
  email: string;
  cnpj: string;
  senha: string;
}
