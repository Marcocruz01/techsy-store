// Importamos las librerias
import { useState } from "react";;
import type { Filter } from "../types";

type FilterarProps = {
    setFilter: (filter : Filter) => void;
}
// Inicializar la funcion del componente
export function FilterBar({ setFilter } : FilterarProps) {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        setFilter({ category: value ? activeCategory : null, search: value });
    };

    const handleCategory = (category : string | null) => {
        setActiveCategory(category);
        setSearch("");               
        setFilter({ category, search: "" }); 
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
            <div className="relative w-full md:w-96">
                <label htmlFor="search" className="sr-only">Search by</label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-400 dark:text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
                    </svg>
                </div>
                <input
                    id="search"
                    name="search"
                    type="search"
                    placeholder="Search for food..."
                    value={search}          
                    onChange={handleSearch} 
                    className="block w-full pl-10 bg-gray-50 pr-3 py-2 border border-gray-300 rounded-lg text-base text-gray-900 placeholder:text-gray-400
                    focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:border-gray-800 focus-visible:outline-none dark:bg-gray-900 dark:border-gray-800 dark:placeholder:text-gray-500 dark:text-gray-300"
                />
            </div>
            <div className="flex gap-3 overflow-x-auto flex-nowrap md:flex-wrap px-2 py-2 w-full md:w-auto">
                <button
                    type="button"
                    onClick={() => handleCategory(null)}
                    className={`px-3 py-2 rounded-lg border ${
                        activeCategory === null ? "bg-gray-950 text-gray-50 font-semibold dark:bg-gray-800 dark:border-gray-800" : "bg-white text-gray-500 hover:bg-gray-50 font-normal dark:bg-gray-900 dark:border-gray-900 dark:hover:bg-gray-800 dark:text-gray-400"
                    }`}
                >
                    All
                </button>
                <button
                    type="button"
                    onClick={() => handleCategory("iPhone")}
                    className={`px-3 py-2 rounded-lg border ${
                        activeCategory === "iPhone" ? "bg-gray-950 text-gray-50 font-semibold dark:bg-gray-800 dark:border-gray-800" : "bg-white text-gray-500 hover:bg-gray-50 font-normal dark:bg-gray-900 dark:border-gray-900 dark:hover:bg-gray-800 dark:text-gray-400"
                    }`}
                >
                    iPhone
                </button>
                <button
                    type="button"
                    onClick={() => handleCategory("iPad")}
                    className={`px-3 py-2 rounded-lg border ${
                        activeCategory === "iPad" ? "bg-gray-950 text-gray-50 font-semibold dark:bg-gray-800 dark:border-gray-800" : "bg-white text-gray-500 hover:bg-gray-50 font-normal dark:bg-gray-900 dark:border-gray-900 dark:hover:bg-gray-800 dark:text-gray-400"
                    }`}
                >
                    iPad
                </button>
                <button
                    type="button"
                    onClick={() => handleCategory("AirPods")}
                    className={`px-3 py-2 rounded-lg border ${
                        activeCategory === "AirPods" ? "bg-gray-950 text-gray-50 font-semibold dark:bg-gray-800 dark:border-gray-800" : "bg-white text-gray-500 hover:bg-gray-50 font-normal dark:bg-gray-900 dark:border-gray-900 dark:hover:bg-gray-800 dark:text-gray-400"
                    }`}
                >
                    AirPods
                </button>
                <button
                    type="button"
                    onClick={() => handleCategory("watch")}
                    className={`px-3 py-2 rounded-lg border text-nowrap ${
                        activeCategory === "watch" ? "bg-gray-950 text-gray-50 font-semibold dark:bg-gray-800 dark:border-gray-800" : "bg-white text-gray-500 hover:bg-gray-50 font-normal dark:bg-gray-900 dark:border-gray-900 dark:hover:bg-gray-800 dark:text-gray-400"
                    }`}
                >
                    Apple Watch
                </button>
                <button
                    type="button"
                    onClick={() => handleCategory("MacBook")}
                    className={`px-3 py-2 rounded-lg border ${
                        activeCategory === "MacBook" ? "bg-gray-950 text-gray-50 font-semibold dark:bg-gray-800 dark:border-gray-800" : "bg-white text-gray-500 hover:bg-gray-50 font-normal dark:bg-gray-900 dark:border-gray-900 dark:hover:bg-gray-800 dark:text-gray-400"
                    }`}
                >
                    MacBook
                </button>
                <button
                    type="button"
                    onClick={() => handleCategory("Accessories")}
                    className={`px-3 py-2 rounded-lg border ${
                        activeCategory === "Accessories" ? "bg-gray-950 text-gray-50 font-semibold dark:bg-gray-800 dark:border-gray-800" : "bg-white text-gray-500 hover:bg-gray-50 font-normal dark:bg-gray-900 dark:border-gray-900 dark:hover:bg-gray-800 dark:text-gray-400"
                    }`}
                >
                    Accessories
                </button>
            </div>
        </div>
    )
}
