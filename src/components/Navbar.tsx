import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useMemo } from "react";
import type { CartItem } from "../types";
import type { CartActions } from "../reducers/cart-reducer";

// Creamos el type de Navbar
type NavbarProps = {
    cart: CartItem[];
    open: boolean;
    showMenu: boolean;
    menuRef: React.RefObject<HTMLDivElement | null>;
    dispatch: React.Dispatch<CartActions>;
    darkMode: boolean;
}
// Crear mi primer componente
export function Navbar({ cart, menuRef, showMenu, dispatch, darkMode, open
    }: NavbarProps) {

    // Verifica si el carrito está vacío
    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    // Calcula el total a pagar
    const total = useMemo(() => cart.reduce((subtotal, item) => subtotal + (item.quantity * item.price), 0), [cart]);

    // Return para mostrar la vista de mi componente
    return (
        // Contenedor padre
        <nav className="bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-10 dark:bg-gray-950 dark:border-gray-900">
            {/* Contenedor Hijo */}
            <div className="max-w-7xl mx-auto px-2 py-3 flex items-center justify-between gap-3">
                {/* Logotipo y nombre */}
                <div className="flex items-center gap-2">
                    <img src="/img/logotipo-techsy.webp" alt="logotipo de la empresa" className="w-8 h-8 dark:invert" />
                    <h1 className="font-bold m-0 text-2xl dark:text-gray-50">Techsy</h1>
                </div>
                {/* links */}
                <div className="hidden lg:flex items-center gap-5">
                    <a href="/" className="text-sm text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-50">Home</a>
                    <a href="/" className="text-sm font-bold text-gray-950 dark:text-gray-50">Products</a>
                    <a href="/" className="text-sm text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-50">Offers</a>
                    <a href="/" className="text-sm text-gray-500 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-50">Contact Us</a>
                </div>
                {/* Carrito y perfil de usuario */}
                <div className="flex items-center gap-2">
                    {/* Boton para el carrito de compras (abre el Drawer) */}
                    <button
                        type="button"
                        className="relative text-gray-500 hover:text-gray-950 hover:bg-gray-100 rounded-full p-2 dark:text-neutral-400 dark:hover:bg-gray-900 dark:hover:text-neutral-50"
                        onClick={() => dispatch({type: "toggle_open", payload: { open: true}})}
                    >
                        {/* Icono del carrito */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 md:size-5" aria-label="boton para ver el carrito de compras">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>

                        {/* Badge de productos en carrito */}
                        {cart.length > 0 && (
                            <div className="absolute top-0.5 -right-0.5 bg-white w-5 h-5 rounded-full flex items-center justify-center dark:bg-gray-950">
                                <span className="bg-red-600 text-white text-xs font-medium w-4 h-4 rounded-full p-1 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            </div>
                        )}
                    </button>
                    {/* Menu desplegable del usuario */}
                    <div className="relative" ref={menuRef}>
                        {/* Boton del menu de usuario */}
                        <button
                            type="button"
                            onClick={() => dispatch({type: "toggle_menu"})}
                            className="text-gray-500 hover:text-gray-950 hover:bg-gray-50 rounded-full p-2 dark:text-neutral-400 dark:hover:bg-gray-900 dark:hover:text-neutral-50"

                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 md:size-5"
                                aria-label="boton del perfil de usuario"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                />
                            </svg>
                        </button>

                        {showMenu && (
                            <>
                                {/* Menu del usuario show/close */}
                                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg py-2 z-50 dark:bg-gray-950 dark:border-gray-900">
                                    {/* Opcion del perfil */}
                                    <button
                                        type="button"
                                        onClick={() => dispatch({ type: "toggle_dark_mode" })}
                                        className="w-full flex items-center justify-between gap-2 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-neutral-50 dark:hover:bg-gray-900"
                                    >
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                            </svg>
                                            {darkMode ? "Light" : "Dark"}
                                        </div>
                                    </button>

                                    {/* Boton de configuracion de cuenta */}
                                    <button 
                                        type="button"
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-neutral-50 dark:hover:bg-gray-900"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                        Profile
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* 5. Drawer checkout carrito (Panel lateral) */}
            <Transition show={(open)} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => dispatch({ type: "toggle_open", payload: { open: false } })}>
                    {/* Overlay de fondo */}
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-in duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500/60 dark:bg-gray-900/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex pl-10 sm:pl-16">

                                {/* Panel lateral (el carrito) */}
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition-all ease-in-out duration-500"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition-all ease-in-out duration-500"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-full md:w-screen max-w-md bg-white shadow-xl flex flex-col h-full dark:bg-gray-950">

                                        {/* Header del carrito */}
                                        <div className="flex items-center justify-between p-[1.15rem] sm:px-6 border-b border-gray-200 dark:border-gray-900">
                                            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-50"> Shopping Cart </Dialog.Title>
                                            <button onClick={() => dispatch({ type: "toggle_open", payload: { open: false } })} className="text-gray-400 hover:text-gray-600">
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>

                                        {/* Contenido del carrito */}
                                        {isEmpty ? (
                                            // Carrito vacío
                                            <div className="flex flex-col items-center justify-center p-6 text-center h-full">
                                                <p className="text-gray-900 font-bold text-xl dark:text-neutral-200">Your cart is empty</p>
                                                <p className="text-center text-sm text-gray-500 dark:text-neutral-400">Add the product you like and you will be able to see it in your shopping cart.</p>
                                            </div>
                                        ) : (
                                            // Productos en el carrito
                                            <>
                                                <div className="flex-1 overflow-y-auto px-2 flow-root">
                                                    <ul className="divide-y divide-gray-200 dark:divide-gray-900">
                                                        {cart.map((product) => (
                                                            <li key={product.id} className="flex flex-1 items-center gap-3 p-3">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                                                                    <img src={`/img/${product.image}.webp`} alt={product.name} className="h-full w-full object-contain object-center" />
                                                                </div>
                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-50">
                                                                        <h3 className="font-semibold text-sm line-clamp-1 gap-2 w-full dark:text-neutral-50">{product.name}</h3>
                                                                        <p className="font-semibold text-sm dark:text-neutral-50">${product.price}</p>
                                                                    </div>
                                                                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400 line-clamp-2">{product.description}</p>

                                                                    <div className="flex flex-1 items-end justify-between text-sm mt-1">
                                                                        {/* Control de cantidad */}
                                                                        <div className="flex items-center gap-2">
                                                                            <button type="button" onClick={() => dispatch({type: "decrease_quantity", payload: {id: product.id}})} className="bg-gray-950 font-bold hover:bg-gray-800 text-white p-1 rounded-full size-5 flex items-center justify-center dark:bg-gray-800 dark:hover:bg-gray-800/90"> - </button>
                                                                            <p className="text-sm font-semibold text-center w-2 dark:text-gray-50">{product.quantity}</p>
                                                                            <button type="button" onClick={() => dispatch({ type: "increase_quantity", payload: {id: product.id}})} className="bg-gray-950 hover:bg-gray-800 text-white p-1 rounded-full dark:bg-gray-800 dark:hover:bg-gray-800/90">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                                </svg>
                                                                            </button>
                                                                        </div>

                                                                        {/* Botón de eliminar */}
                                                                        <div className="flex">
                                                                            <button 
                                                                                type="button" 
                                                                                onClick={() => dispatch({type: "remove_from_cart", payload: {id: product.id}})} 
                                                                                className="font-medium text-gray-600 hover:text-gray-800"
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                                </svg>
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Footer con Total y Checkout */}
                                                <div className="border-t border-gray-200 p-4 sm:p-6 dark:border-gray-900">
                                                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-50">
                                                        <p>Subtotal</p>
                                                        <p>${total.toFixed(2)}</p>
                                                    </div>
                                                    <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                                                        You save <span className="font-bold text-gray-950 dark:text-neutral-50">5%</span> with each order
                                                    </p>
                                                    <div className="mt-6">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                // Cierra el drawer/modal del carrito
                                                                dispatch({ type: "toggle_open", payload: { open: false } });
                                                                // Dispara el éxito de la compra, lo que limpia el carrito Y muestra el Toast
                                                                dispatch({
                                                                    type: "purchase_success",
                                                                    payload: {
                                                                        message: "Order successfully placed!",
                                                                        description: "Your order has been successfully generated in our store."
                                                                    }
                                                                });
                                                            }}
                                                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-gray-950 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-gray-900 dark:bg-blue-600 dark:hover:bg-blue-600/90"
                                                        >
                                                            Buy now
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </nav>
    )
}