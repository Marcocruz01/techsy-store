// Importamos las librerias y tipos necesarios
import { useState } from "react";
import type { Filter } from "../types";
import type { ChangeEvent } from "react";

// Definición del tipo para las props
type FilterarProps = {
    setFilter: (filter : Filter) => void; // Función para actualizar el filtro en useCart
}

// Inicializar la funcion del componente
export function FilterBar({ setFilter } : FilterarProps) {
    // Estado local para el campo de búsqueda de texto
    const [search, setSearch] = useState("");
    // Estado local para la categoría activa/seleccionada
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    // Lista de categorías disponibles (debería ser dinámica, pero la hacemos fija para este ejemplo)
    const categories = ["iPhone", "MacBook", "watch", "Accessories"];

    // Manejador de la búsqueda por texto
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        // Llama a la función del hook con el nuevo valor de búsqueda
        setFilter({ category: activeCategory, search: value });
    };

    // Manejador del filtro por categoría
    const handleCategory = (category : string | null) => {
        setActiveCategory(category); // Actualiza la categoría activa
        setSearch("");               // Limpia la búsqueda de texto al cambiar la categoría
        // Llama a la función del hook con la nueva categoría
        setFilter({ category, search: "" }); 
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
            
            {/* Campo de búsqueda */}
            <div className="relative w-full md:w-96">
                <label htmlFor="search" className="sr-only">Search by</label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    {/* Icono de búsqueda */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-400 dark:text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                    </svg>
                </div>
                <input
                    id="search"
                    name="search"
                    type="search"
                    placeholder="Search for products..."
                    value={search}          
                    onChange={handleSearch} // Llama al manejador de búsqueda
                    className="block w-full pl-10 bg-gray-50 pr-3 py-2 border border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400
                    focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:border-gray-800 focus-visible:outline-none dark:bg-gray-900 dark:border-gray-800 dark:placeholder:text-gray-500 dark:text-gray-300"
                />
            </div>

            {/* Botones de Categoría */}
            <div className="flex gap-3 overflow-x-auto flex-nowrap md:flex-wrap px-2 py-2 w-full md:w-auto">
                {/* Botón para "Todos los productos" */}
                <button
                    type="button"
                    onClick={() => handleCategory(null)} // Establece la categoría a null
                    className={`px-3 py-2 rounded-lg border ${
                        // Clase condicional: si activeCategory es null, resalta el botón
                        activeCategory === null ? 
                        "bg-gray-950 text-gray-50 font-semibold dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-500" 
                        : 
                        "bg-white text-gray-500 hover:bg-gray-50 font-normal dark:bg-gray-900 dark:border-gray-900 dark:hover:bg-gray-800 dark:text-gray-400"
                    }`}
                >
                    All
                </button>
                {/* Mapeo de categorías */}
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => handleCategory(category)}
                        className={`px-3 py-2 rounded-lg border ${
                            // Clase condicional: resalta el botón si coincide con la categoría activa
                            activeCategory === category ? 
                            "bg-gray-950 text-gray-50 font-semibold dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-500" 
                            : 
                            "bg-white text-gray-500 hover:bg-gray-50 font-normal dark:bg-gray-900 dark:border-gray-900 dark:hover:bg-gray-800 dark:text-gray-400"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    )
}