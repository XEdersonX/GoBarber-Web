import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', // Endereco da minha api la com o node
});

export default api;
