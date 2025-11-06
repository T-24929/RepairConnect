import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-d3fbde8b`;

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: any;
}

async function apiCall(endpoint: string, options: ApiOptions = {}) {
  const { method = 'GET', body } = options;
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error(`API Error (${endpoint}):`, data);
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`API call failed (${endpoint}):`, error);
    throw error;
  }
}

// Booking API
export const bookingApi = {
  create: (booking: any) => apiCall('/bookings', { method: 'POST', body: booking }),
  get: (id: string) => apiCall(`/bookings/${id}`),
  updateStatus: (id: string, status: string) => apiCall(`/bookings/${id}/status`, { method: 'PATCH', body: { status } })
};

// Chat API
export const chatApi = {
  getMessages: (bookingId: string) => apiCall(`/chat/${bookingId}`),
  sendMessage: (bookingId: string, message: any) => apiCall(`/chat/${bookingId}`, { method: 'POST', body: message })
};

// Ratings API
export const ratingsApi = {
  submit: (rating: any) => apiCall('/ratings', { method: 'POST', body: rating }),
  getForMechanic: (mechanicId: string) => apiCall(`/mechanics/${mechanicId}/ratings`)
};

// Mechanics API
export const mechanicsApi = {
  getAll: () => apiCall('/mechanics')
};
