// Importar las librerias necesarias
import { db } from "../data/db.ts";
import { useState, useMemo, useEffect, useRef } from "react";
import type { Product, CartItem, ProductId } from "../types/index.ts";
import type { Filter } from "../types";

export const useCart = () => {

    // Inicializamos los states del toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ message: "", description: "" });

    // Variable global para los elementos maximos de un carrito
    const max_items = 6;
    const min_items = 1;

    // Inicializar nuestro carrito de compras con localstorage
    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart');
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    // Inicializamos el state de la base de datos
    const [data] = useState(db);
    // Inicializamos el state del carrito
    const [cart, setCart] = useState(initialCart);

    // Funcion para agregar al carrito el producto
    function addToCart(item : Product) {
        // Encontrar el item al cual estamos agregando a nuestro carrito
        const itemExist = cart.findIndex(product => product.id === item.id);
        if (itemExist >= 0) {
            // Crear una copia del carrito actual (esto es para no mutar el state directamente)
            const updateCart = [...cart];
            // Actualizar la cantidad del producto no mayor al max_item
            if (updateCart[itemExist].quantity < max_items) {
                // Incrementamos mas 1 la cantidad
                updateCart[itemExist].quantity++;
                // Actualizar el carrito
                setCart(updateCart);
                // Mostrar toast
                setToastMessage({
                    message: "Update quantity",
                    description: "The quantity of the product was updated."
                });
                setShowToast(true);
            }
        } else {
            // Agregar el producto al carrito con la cantdad de 1
            const newItem : CartItem = {...item, quantity: 1}
            setCart([...cart, newItem]);
            setToastMessage({
                message: "Product added",
                description: "The product was successfully added to the cart."
            });
            setShowToast(true);
        }
    }

    // Funcion para eliminar los productos del carrito
    function removeFromCart(id : ProductId) {
        setCart(prevCart => prevCart.filter(prodct => prodct.id !== id));
    }

    // Funcion para incrementar la cantidad del producto 
    function increaseQuantity(id : ProductId) {
        // Creamos una variable nueva para modificar el state
        const updateCart = cart.map(item => {
            // Recorremos el arreglo para identificar el elemento sobre el cual dimos click
            if (item.id === id && item.quantity < max_items) {
                return {
                    ...item,
                    quantity: item.quantity + 1 // Incrementamos la cantidad
                }
            }
            return item; // El resto de elementos los mantenemos como estan 
        })
        setCart(updateCart); // Actualizamos la cantidad del carrito sobre el elemento que dimos click
    }

    // Funcion para decrementar la cantidad del elemento
    function decreaseQuantity(id : ProductId) {
        // Creamos una variable nueva para modificar el state
        const updateCart = cart.map(item => {
            // Recorremos el arreglo para identificar al elemento que decrementaremos la cantidad
            if (item.id === id && item.quantity > min_items) {
                return {
                    ...item,
                    quantity: item.quantity - 1 // Decrementamos la cantidad
                }
            }
            return item; // El resto de elementos los dejamos igual
        });
        setCart(updateCart); // Actualizamos la cantidad del elemento sobre el cual dimos click
    }

    // Vaciar el arrito
    function clearCart() {
        setCart([]); // Seteamos un arreglo vacio
        setToastMessage({
            message: "Order request",
            description: "The order with the product(s) was shipped correctly."
        });
        setShowToast(true);
    }

    // Inicializamos el state de nuestro drawer
    const [open, setOpen] = useState(false);

    // State derivado 
    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    // Array method para calcular el total del pedido
    const total = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

    // Inicializamos el state de los filtros
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(data);
    const [filter, setFilter] = useState<Filter>({ category: null, search: "" });

    // useEffect para actualizar productos filtrados cada vez que filter cambie
    useEffect(() => {
        let result = data;

        if (filter.category) {
            result = result.filter(product => product.category === filter.category);
        }

        if (filter.search) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(filter.search.toLowerCase())
            );
        }
        setFilteredProducts(result);
    }, [filter, data]);

    // Inicializamos nuestro useEffect
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Funcion para filtrar los productos
    function handleFilter(filterObj : Filter) {
        setFilter(filterObj);
    }

    // State para mostrar y ocultar el menu del perfil
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    // Aplicar el handle al cargar
    useEffect(() => {
        const handleClickOutside = (event : MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowMenu(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Hablitar el modo oscuro
    const [darkMode, setDarkMode] = useState(() => {
        // Leer el valor inicial desde localStorage
        const stored = localStorage.getItem('darkMode');
        return stored === 'true'; // convierte a booleano
    });
    
    useEffect(() => {
        // Aplicar la clase 'dark' al <html>
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Guardar el valor en localStorage
        localStorage.setItem('darkMode', darkMode ? 'dark' : 'light');
    }, [darkMode]);
   

    return {
        data,
        cart,
        showToast,
        toastMessage,
        setShowToast,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        open,
        setOpen,
        isEmpty,
        total,
        filteredProducts, 
        handleFilter,
        showMenu,
        setShowMenu,
        menuRef,
        darkMode, 
        setDarkMode
    }
}