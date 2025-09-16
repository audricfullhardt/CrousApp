import { buildApiUrl } from './Config';

// Types pour les réponses API
export interface Restaurant {
  code: number;
  nom: string;
  adresse: string;
  image_url: string | null;
  actif: boolean;
  zone: string;
  latitude?: number;
  longitude?: number;
  distance?: number;
  region?: {
    code: number;
    libelle: string;
  };
  horaires?: string[];
  paiement?: string[];
  jours_ouvert?: {
    jour: string;
    ouverture: {
      matin: boolean;
      midi: boolean;
      soir: boolean;
    };
  }[];
  isOpen?: boolean;
  type?: {
    libelle: string;
  };
}

export interface MenuResponse {
  data: {
    code: number;
    date: string;
    repas: {
      code: number;
      type: string;
      categories: {
        code: number;
        libelle: string;
        ordre: number;
        plats: {
          code: number;
          libelle: string;
          ordre: number;
        }[];
      }[];
    }[];
  };
  success: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Classe pour gérer les appels API
class ApiService {
  private async makeRequest<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Endpoints pour les restaurants
  async getRestaurants(): Promise<ApiResponse<Restaurant[]>> {
    return this.makeRequest<ApiResponse<Restaurant[]>>(buildApiUrl('restaurants'));
  }

  async getRestaurantsForMap(): Promise<ApiResponse<Restaurant[]>> {
    return this.makeRequest<ApiResponse<Restaurant[]>>(buildApiUrl('restaurants'));
  }

  async getRestaurant(id: string): Promise<ApiResponse<Restaurant>> {
    return this.makeRequest<ApiResponse<Restaurant>>(buildApiUrl(`restaurants/${id}`));
  }

  async getRestaurantMenu(restaurantId: string, date: string): Promise<MenuResponse> {
    return this.makeRequest<MenuResponse>(buildApiUrl(`restaurants/${restaurantId}/menu/${date}`));
  }
}

// Instance singleton
export const apiService = new ApiService();

// Fonctions d'aide pour les appels API courants
export const api = {
  // Restaurants
  getRestaurants: () => apiService.getRestaurants(),
  getRestaurantsForMap: () => apiService.getRestaurantsForMap(),
  getRestaurant: (id: string) => apiService.getRestaurant(id),
  getRestaurantMenu: (restaurantId: string, date: string) => apiService.getRestaurantMenu(restaurantId, date),
}; 