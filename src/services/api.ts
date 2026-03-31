import axios from 'axios';

// ⚠️ COLOQUE SUAS CREDENCIAIS AQUI ⚠️
const API_KEY = '$2a$10$VT4jaGemcXHM1D/o5MldcepqL/qX65.JbMNNLUQrsjXutEIpn1pg2';  // Cole sua X-Access-Key
const BIN_ID = '69cb366936566621a864248a';    // Cole seu Bin ID

const api = axios.create({
  baseURL: 'https://api.jsonbin.io/v3',
  headers: {
    'X-Access-Key': API_KEY,
    'Content-Type': 'application/json'
  }
});

export const getCapsules = async (): Promise<any[]> => {
  try {
    console.log('🔍 Buscando cápsulas...');
    const response = await api.get(`/b/${BIN_ID}/latest`);
    
    console.log('📦 Resposta completa:', response.data);
    
    // O JSONBin retorna os dados dentro de 'record'
    if (response.data && response.data.record) {
      const capsules = response.data.record.capsules || [];
      console.log(`✅ Encontradas ${capsules.length} cápsulas`);
      return capsules;
    }
    
    return [];
  } catch (error: any) {
    console.error('❌ Erro na API:');
    console.error('Status:', error.response?.status);
    console.error('Mensagem:', error.response?.data?.message || error.message);
    return [];
  }
};

export const saveCapsules = async (capsules: any[]): Promise<boolean> => {
  try {
    console.log(`💾 Salvando ${capsules.length} cápsulas...`);
    
    const response = await api.put(`/b/${BIN_ID}`, { capsules });
    
    console.log('✅ Salvo com sucesso!', response.status);
    return true;
  } catch (error: any) {
    console.error('❌ Erro ao salvar:');
    console.error('Status:', error.response?.status);
    console.error('Mensagem:', error.response?.data?.message || error.message);
    return false;
  }
};