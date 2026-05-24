export type Genero = 'macho' | 'femea' | 'desconhecido';
export type Porte = 'pequeno' | 'medio' | 'grande';
export type NivelRisco = 'baixo' | 'medio' | 'alto';

export interface IPet {
  id: string;
  tutorId: string;
  nome: string;
  especie: string;
  raca: string;
  genero: Genero;
  idade: string;
  peso: string;
  cor: string;
  notasSaude?: string;
  foto?: string;
  ultimoScore?: number;
  risco?: NivelRisco;
  criadoEm?: string;
}

export interface IEventoTimeline {
  id: string;
  petId: string;
  tipo: 'painsense' | 'consulta' | 'vacina' | 'nota';
  titulo: string;
  descricao: string;
  autor: string;
  data: string;
}

export interface IConsulta {
  id: string;
  petId: string;
  nomePet: string;
  nomeVet: string;
  nomeClinica: string;
  data: string;
  horario: string;
  motivo: string;
  status: 'agendada' | 'concluida' | 'cancelada';
}
