/**
 * Lametna API Client
 * Replaces all mock data with production Axios/Fetch calls.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Handle token expiry
        window.dispatchEvent(new CustomEvent('auth:unauthorized'));
      }
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  // --- Auth ---
  async login(credentials: any) { return this.request('/auth/login/', { method: 'POST', body: JSON.stringify(credentials) }); }
  async getProfile() { return this.request('/auth/me/'); }

  // --- Games ---
  async getGames() { return this.request('/games/'); }
  async getGameDetails(id: string) { return this.request(`/games/${id}/`); }

  // --- Match Engine ---
  async createMatch(gameId: string, config: any) { 
    return this.request('/matches/', { method: 'POST', body: JSON.stringify({ game_id: gameId, config }) }); 
  }
  async joinMatch(matchId: string) {
    return this.request(`/matches/${matchId}/join/`, { method: 'POST' });
  }

  // --- Party ---
  async getParties() { return this.request('/parties/'); }
  async createParty(data: any) { return this.request('/parties/', { method: 'POST', body: JSON.stringify(data) }); }

  // --- Friends ---
  async getFriends() { return this.request('/friends/'); }
  
  // --- Economy ---
  async getWallet() { return this.request('/economy/wallet/'); }
  async getShopItems() { return this.request('/economy/shop/'); }
}

export const api = new ApiClient();
