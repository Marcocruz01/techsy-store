import { db } from "../data/db";
import type { CartItem, Filter, Product, ProductId } from "../types"

// Types de acciones
export type CartActionType = 
    | 'add_to_cart'
    | 'remove_from_cart'
    | 'increase_quantity'
    | 'decrease_quantity'
    | 'clear_cart'
    | 'set_filter'
    | 'toggle_dark_mode'
    | 'toggle_open'
    | 'toggle_menu'
    | 'purchase_success'

// Definimos la interfaz de la accion
export type CartActions = 
    | { type: "add_to_cart", payload: {item: Product} }
    | { type: "remove_from_cart", payload: {id: ProductId} }
    | { type: "increase_quantity", payload: {id: ProductId} }
    | { type: "decrease_quantity", payload: {id: ProductId} }
    | { type: "clear_cart" }
    | { type: "set_filter", payload: {category: string | null, search: string} }
    | { type: "toggle_dark_mode" }
    | { type: "toggle_open", payload: {open: boolean} }
    | { type: "toggle_menu" }
    | { type: "purchase_success", payload: { message: string, description: string } } 
    | { type: "hide_toast" }

// Definir el ESTADO GLOBAL de la APP
export type CartState = {
    data: Product[];          // La base de datos de productos
    cart: CartItem[];         // El carrito de compras
    filter: Filter;           // El estado de filtro/búsqueda
    darkMode: boolean;        // Estado del modo oscuro
    open: boolean;            // Estado de visibilidad del Drawer del carrito
    max_items: number;
    min_items: number;
    showMenu: boolean; 
    toast: { show: boolean, message: string, description: string};
}


// Cargar el carrito desde LocalStorage
const getInitialCart = (): CartItem[] => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
}

// Cargar el modo oscuro desde LocalStorage
const getInitialDarkMode = (): boolean => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark';
}

// Estado Inicial (Initial State)
export const initialCartState: CartState = {
    data: db, // Base de datos de productos (inmutable)
    cart: getInitialCart(), // Carrito inicial (desde LocalStorage)
    filter: { category: null, search: "" }, // Filtro inicial
    darkMode: getInitialDarkMode(), // Modo oscuro inicial
    open: false, // Drawer cerrado inicialmente
    max_items: 6, // Límite por producto
    min_items: 1, // Mínimo de productos
    showMenu: false, // Menu oculto principalmente
    toast: { show: false, message: "", description: "" }
};

// ELreducer principal
export const cartReducer = (state: CartState = initialCartState, action: CartActions) => {
    // Hacemos el switch case para manejar las diferentes acciones de forma inmutable
    switch (action.type) {
        case "add_to_cart": {
            // Extraemos el producto enviado en la accion
            const { item } = action.payload;
            // Verificar si el producto ya esta en el carrito 
            const itemExist = state.cart.findIndex(product => product.id === item.id);

            // Arreglo temporal para almacenar el carrito actualizado
            let updatedCart : CartItem[] = [];

            // SI el producto ya existe en el carrito 
            if(itemExist >= 0) {
                // Recorremos el carrito de forma inmutable para actualizar solo el producto correspondiente
                updatedCart = state.cart.map((product) => {
                    // Si es el producto existente y tiene espacio para incrementar cantidad
                    if (product.id === action.payload.item.id) {
                        if(product.quantity < state.max_items) {
                            return { ...product, quantity: product.quantity + 1 };
                        } else {
                            return product;
                        }
                    } else {
                        return product;
                    }
                });
            } else {
                // Si el producto no existe en el carrito, lo agregamos con cantidad inicial = 1;
                const newItem: CartItem = { ...action.payload.item, quantity: 1 };
                updatedCart = [...state.cart, newItem];
            }
            // Devolvemos el nuevo estado del carrito
            return {
                ...state,
                cart: updatedCart,
            }
        }
        case "remove_from_cart": {
            // Crear logica para la eliminacion del producto 
            const updatedCart = state.cart.filter(product => product.id !== action.payload.id);
            // Devolvemos el estado nuevo
            return {
                ...state,
                cart: updatedCart
            }
        }
        case "increase_quantity": {
            const updatedCart = state.cart.map(item => {
                if (item.id === action.payload.id && item.quantity < state.max_items) {
                    return {
                        ...item,
                        quantity: item.quantity + 1 // Aumentar en 1
                    }
                }
                return item; // Devolver el elemento sin cambios si no es el ID o si ya alcanzó el máximo
            });
            // Devolvemos el estado nuevo
            return {
                ...state,
                cart: updatedCart,
            }
        }
        case "decrease_quantity": {
            const updatedCart = state.cart.map(item => {
                if (item.id === action.payload.id && item.quantity > state.min_items) {
                    return {
                        ...item,
                        quantity: item.quantity - 1 // Disminuir en 1
                    }
                }
                // Si la cantidad es 1, se mantiene en 1 (no se permite 0 ni negativo)
                return item; 
            });
            // Devolvemos el estado nuevo
            return {
                ...state,
                cart: updatedCart,
            }
        }
        case "clear_cart": {
            // Devolvemos el estado nuevo
            return {
                ...state,
                cart: [],
            }
        }
        case "set_filter": {
            // Devolvemos el estado nuevo
            return {
                ...state,
                filter: {
                    category: action.payload.category,
                    search: action.payload.search
                }
            }
        }
        case "toggle_dark_mode": {
            // Devolvemos el estado nuevo
            return {
                ...state,
                darkMode: !state.darkMode, // Invierte el estado de darkMode
            }
        }
        case "toggle_open": {
            // Establece el estado de 'open'
            const { open } = action.payload;
            // Devolvemos el estado nuevo
            return {
                ...state,
                open: open,
            }
        }
        case "toggle_menu": {
            // Devolvemos el estado nuevo
            return {
                ...state,
                showMenu: !state.showMenu // Invertimos el estado
            }
        }
        case "purchase_success": {
            // Devolvemos el estado nuevo
            return {
                ...state,
                cart: [], // Devolvemos el carrito vacio 
                toast: {
                    show: true,
                    message: action.payload.message || "Order successfully placed!",
                    description: action.payload.description || "Your order has been successfully generated in our store."
                }
            }
        }
        case "hide_toast": {
            return {
                ...state,
                toast: {
                    ...state.toast,
                    show: false, // Solo cambiamos la visibilidad a false
                },
            };
        }
        default:
            return state;
    }
};