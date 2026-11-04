import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

if (import.meta.env.DEV) {
  httpClient.interceptors.request.use(config => {
    const parametrosDaPagina = new URLSearchParams(window.location.search);
    const simulacao = {};
    ['_delay', '_erro'].forEach(nome => {
      if (parametrosDaPagina.has(nome)) simulacao[nome] = parametrosDaPagina.get(nome);
    });
    config.params = { ...config.params, ...simulacao };
    return config;
  });
}

httpClient.interceptors.response.use(
  resposta => resposta,
  erro => {
    const corpo = erro.response?.data;
    const erroNormalizado = new Error(corpo?.mensagem ?? erro.message);
    erroNormalizado.status = erro.response?.status ?? null;
    erroNormalizado.codigo = corpo?.codigo ?? null;
    return Promise.reject(erroNormalizado);
  }
);
