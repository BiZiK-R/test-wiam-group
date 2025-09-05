import axios from 'axios';
import { Category } from '../types/Category';

const API_BASE_URL = 'https://dummyjson.com';

export const api = {
  getCategories: async (): Promise<Category[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  submitApplication: async (data: { title: string }): Promise<any> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products/add`, data, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },
};