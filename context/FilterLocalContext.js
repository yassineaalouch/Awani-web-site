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

export const FilterLocalContext = createContext({});

function FilterLocalContextProvider({ children }) {
    const [filterLocal, setFilterLocal] = useState({
        category: '',
        price: null,
        rating: null,
        order: null
    });

    // Chargement initial de la catégorie à partir du localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCategory = localStorage.getItem('FilterLocal');
            if (storedCategory) {
                try {
                    setFilterLocal(JSON.parse(storedCategory));
                } catch (error) {
                    // Si le JSON n'est pas valide, utiliser la valeur par défaut 'All'
                    setFilterLocal({});
                }
            }
        }
    }, []);

    // Sauvegarde de la catégorie dans le localStorage à chaque changement
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('filterLocal', JSON.stringify(filterLocal));
        }
    }, [filterLocal]);

    return (
        <FilterLocalContext.Provider value={{ filterLocal, setFilterLocal }}>
            {children}
        </FilterLocalContext.Provider>
    );
}

export default FilterLocalContextProvider;
