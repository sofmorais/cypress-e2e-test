import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Configure node events aqui, se necessário
    },
    baseUrl: 'https://servicos.trt7.jus.br/',
    env: {
      url: 'https://homologacao-servicos.trt7.jus.br/'
    },
  },
});
