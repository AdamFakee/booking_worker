import Constants from 'expo-constants';

// Determine the API URL based on the environment
const getApiUrl = () => {
  const hostUri = Constants.expoConfig?.hostUri;
  const localhost = hostUri ? hostUri.split(':')[0] : 'localhost';
  return `http://${localhost}:3000/api`;
};

const API_URL = getApiUrl();

export interface Worker {
  id: string; // This is the worker PROFILE id
  user_id: string;
  bio: string;
  verified: boolean;
  experience_years: number;
  success_rate: number;
  total_jobs: number;
  rating: number;
  review_count: number;
  location_lat: string | null;
  location_long: string | null;
  zalo_phone: string | null;
  user: {
    id: string;
    name: string;
    avatar: string;
    phone: string;
    is_worker_active: boolean;
  };
  skills: {
    skill_name: string;
  }[];
  service: {
    name: string;
    icon: string | null;
  };
}

export const getWorkersByService = async (serviceName: string): Promise<Worker[]> => {
  try {
    const response = await fetch(`${API_URL}/workers?serviceName=${encodeURIComponent(serviceName)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.status === 'success') {
      return result.data;
    } else {
      console.error('Error fetching workers:', result.message);
      return [];
    }
  } catch (error) {
    console.error('Network error fetching workers:', error);
    return [];
  }
};
