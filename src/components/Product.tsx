// Importamos el type
import type { CartActions } from "../reducers/cart-reducer";
import type { Product } from "../types"

// Creamos el type local del producto
type ProductProps = {
    product: Product;
    dispatch: React.Dispatch<CartActions>
}

// Creamos el componente
export function Product({ product, dispatch } : ProductProps) {

    // Hacemos el destructuring del producto
    const { name, description, price, category, image } = product;

    return (
        <div className="flex flex-col bg-white hover:shadow-md border border-gray-200 rounded-lg overflow-hidden dark:bg-gray-900 dark:border-gray-800">
            {/* Content image */}
            <div className="relative flex items-center justify-center py-4 min-h-64">
                <img src={`/img/${image}.webp`} alt={`${name}`} loading="lazy" className="w-full h-64 object-contain rounded-t-lg dark:bg-gray-900"/>
                <p className="absolute top-6 left-6 bg-neutral-100 px-2 py-1 rounded-lg shadow-sm text-sm font-medium text-gray-500 dark:bg-gray-950 dark:text-gray-200">{category}</p>
            </div>
            <div className="bg-neutral-50 border-t border-gray-200 p-5 dark:bg-gray-950 dark:border-gray-800">
                {/* Content information */}
                <div className="flex items-center justify-between pb-3">
                    <h2 className="font-semibold dark:text-gray-50">{name}</h2>
                    <p className="font-bold dark:text-gray-50">${price}</p>
                </div>
                <p className="text-gray-500 line-clamp-2 dark:text-gray-400">{description}</p>
                <div className="w-full flex items-end justify-end mt-5">
                    <button 
                        type="button" 
                        onClick={() => dispatch({ type: 'add_to_cart', payload: {item: product}})}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-950 text-white text-sm font-semibold hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Buy
                    </button>
                </div>
            </div>
        </div>
    )
}