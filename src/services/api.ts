import axios from 'axios';

const API_KEY = '$2a$10$erOOPlaBzVzt0KjT8YOvf.U.PpXu//nAFB4MKSb7kFplkjjPF23Ze';
const BIN_ID = '69cb185f856a682189e4086f';

const api = axios.create({
  baseURL: 'https://api.jsonbin.io/v3',
  headers: {
    'X-Master-Key': API_KEY,
    'Content-Type': 'application/json'
  }
});

export const getCapsules = async () => {
  try {
    const response = await api.get(`/b/${BIN_ID}/latest`);
    return response.data.record.capsules || [];
  } catch (error) {
    console.error('Erro ao carregar cápsulas:', error);
    return [];
  }
};

export const saveCapsules = async (capsules: any[]) => {
  try {
    await api.put(`/b/${BIN_ID}`, { capsules });
    return true;
  } catch (error) {
    console.error('Erro ao salvar cápsulas:', error);
    return false;
  }
};