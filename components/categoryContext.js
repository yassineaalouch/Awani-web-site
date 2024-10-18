// "use client";
// import { createContext, useState, useEffect } from 'react';
// export const CategoryContext = createContext({});

// function CategoryContextProvider({ children }) {
//     const [category, setCategory] = useState('All');
//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             const Category = localStorage.getItem('CategoryLocal');
//             if (Category) {
//                 setCategory(JSON.parse(Category));
//             }
//         }
//     }, []);

//     useEffect(() => {
//             localStorage.setItem('CategoryLocal', JSON.stringify(category));

//     }, [category]);

//   return (
//     <div>
//         <CategoryContext.Provider value={{ category, setCategory }}>
//             {children}
//         </CategoryContext.Provider>
//     </div>
//   )
// }

// export default CategoryContextProvider

// //////////////////////////////////////////////////////////////////

"use client";
import { createContext, useState, useEffect } from 'react';

export const CategoryContext = createContext({});

function CategoryContextProvider({ children }) {
    const [category, setCategory] = useState('All');

    // Chargement initial de la catégorie à partir du localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCategory = localStorage.getItem('CategoryLocal');
            if (storedCategory) {
                try {
                    setCategory(JSON.parse(storedCategory));
                } catch (error) {
                    console.error("Erreur lors du parsing de la catégorie :", error);
                    // Si le JSON n'est pas valide, utiliser la valeur par défaut 'All'
                    setCategory('All');
                }
            }
        }
    }, []);

    // Sauvegarde de la catégorie dans le localStorage à chaque changement
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('CategoryLocal', JSON.stringify(category));
        }
    }, [category]);

    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {children}
        </CategoryContext.Provider>
    );
}

export default CategoryContextProvider;
