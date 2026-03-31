import axios from 'axios';

// ⚠️ IMPORTANTE: Substitua pelos seus dados do JSONBin.io
const API_KEY = '$2a$10$VT4jaGemcXHM1D/o5MldcepqL/qX65.JbMNNLUQrsjXutEIpn1pg2'; // Sua X-Access-Key
const BIN_ID = '69cb366936566621a864248a';   // Seu Bin ID

// Configuração do axios com headers corretos
const api = axios.create({
  baseURL: 'https://api.jsonbin.io/v3',
  headers: {
    'X-Access-Key': API_KEY,  // Atenção: é X-Access-Key, não X-Master-Key
    'Content-Type': 'application/json'
  }
});

export const getCapsules = async (): Promise<any[]> => {
  try {
    console.log('🔍 Buscando cápsulas da API...');
    console.log('Bin ID:', BIN_ID);
    console.log('API Key:', API_KEY ? '✅ Configurada' : '❌ Faltando');
    
    const response = await api.get(`/b/${BIN_ID}/latest`);
    
    console.log('✅ Resposta da API:', response.data);
    
    // O JSONBin retorna os dados dentro de 'record'
    if (response.data.record && response.data.record.capsules) {
      return response.data.record.capsules;
    }
    
    return [];
  } catch (error: any) {
    console.error('❌ Erro ao carregar cápsulas da API:');
    console.error('Status:', error.response?.status);
    console.error('Mensagem:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const saveCapsules = async (capsules: any[]): Promise<boolean> => {
  try {
    console.log('💾 Salvando cápsulas na API...', capsules.length);
    
    const response = await api.put(`/b/${BIN_ID}`, { capsules });
    
    console.log('✅ Cápsulas salvas com sucesso!', response.status);
    return true;
  } catch (error: any) {
    console.error('❌ Erro ao salvar cápsulas na API:');
    console.error('Status:', error.response?.status);
    console.error('Mensagem:', error.response?.data?.message || error.message);
    return false;
  }
};

// Função para testar a conexão com a API
export const testConnection = async (): Promise<boolean> => {
  try {
    console.log('🔌 Testando conexão com JSONBin.io...');
    const response = await api.get(`/b/${BIN_ID}/latest`);
    console.log('✅ Conexão OK!', response.status);
    return true;
  } catch (error: any) {
    console.error('❌ Falha na conexão:', error.message);
    return false;
  }
};