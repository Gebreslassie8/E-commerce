 import { useState, useEffect } from 'react';
 import { Category } from '../types/product.types';

 export const useCategories = () => {
   const [categories, setCategories] = useState<Category[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
         // Mock data - replace with API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const mockCategories: Category[] = [
          { id: 'smartphones', name: 'Smartphones', productCount: 45, icon: '📱' },
          { id: 'laptops', name: 'Laptops', productCount: 32, icon: '💻' },
           { id: 'tablets', name: 'Tablets', productCount: 18, icon: '📱' },
           { id: 'headphones', name: 'Headphones', productCount: 27, icon: '🎧' },
          { id: 'wearables', name: 'Wearables', productCount: 22, icon: '⌚' },
          { id: 'accessories', name: 'Accessories', productCount: 56, icon: '🔌' },
           { id: 'components', name: 'Components', productCount: 39, icon: '🔧' }
        ];
        
        setCategories(mockCategories);
      } catch (err) {
         setError('Failed to load categories');
         console.error(err);
       } finally {
       setLoading(false);
     }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
 };