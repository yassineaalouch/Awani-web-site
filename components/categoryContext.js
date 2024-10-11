"use client";
import { createContext, useState, useEffect } from 'react';
export const CategoryContext = createContext({});

function CategoryContextProvider({ children }) {
    const [category, setCategory] = useState('All');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const Category = localStorage.getItem('CategoryLocal');
            if (Category) {
                setCategory(JSON.parse(Category));
            }
        }
    }, []);

    useEffect(() => {
            localStorage.setItem('CategoryLocal', JSON.stringify(category));
        
    }, [category]);

  return (
    <div>
        <CategoryContext.Provider value={{ category, setCategory }}>
            {children}
        </CategoryContext.Provider>
    </div>
  )
}

export default CategoryContextProvider

//////////////////////////////////////////////////////////////////

