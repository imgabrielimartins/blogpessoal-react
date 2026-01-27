import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const cadastrarUsuario = async (
  url: string,
  dados: unknown,
  setDados: (data: any) => void
): Promise<void> => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const logar = async (
  url: string,
  dados: unknown,
  setDados: (data: any) => void
): Promise<void> => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const buscar = async (
  url: string,
  setDados: (data: any) => void,
  header?: AxiosRequestConfig
): Promise<void> => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

export const cadastrar = async (
  url: string,
  dados: unknown,
  setDados: (data: any) => void,
  header?: AxiosRequestConfig
): Promise<void> => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: unknown,
  setDados: (data: any) => void,
  header?: AxiosRequestConfig
): Promise<void> => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};


export const deletar = async (
  url: string,
  header?: AxiosRequestConfig
): Promise<void> => {
  await api.delete(url, header);
};
