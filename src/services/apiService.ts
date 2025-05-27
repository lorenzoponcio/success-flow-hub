
const BASE_URL = 'http://localhost:8080/api/v1'; // Ajuste a porta conforme necessário

export interface Client {
  id?: number;
  name: string;
  contact: string;
  email: string;
  status: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // GET /client - Listar todos os clientes
  async getAllClients(): Promise<Client[]> {
    return this.request<Client[]>('/client');
  }

  // POST /client - Criar novo cliente
  async createClient(client: Omit<Client, 'id'>): Promise<Client> {
    return this.request<Client>('/client', {
      method: 'POST',
      body: JSON.stringify(client),
    });
  }

  // PUT /client/{id} - Atualizar cliente
  async updateClient(id: number, client: Omit<Client, 'id'>): Promise<Client> {
    return this.request<Client>(`/client/${id}`, {
      method: 'PUT',
      body: JSON.stringify(client),
    });
  }

  // DELETE /client/{id} - Deletar cliente
  async deleteClient(id: number): Promise<void> {
    return this.request<void>(`/client/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
