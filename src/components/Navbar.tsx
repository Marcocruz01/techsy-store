// Creamos nuestro type
type NavbarProps = {
    cart: CartItem[],
    removeFromCart: (id: Product['id']) => void,
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    clearCart: () => void,
    isEmpty: boolean,
    total: number,
    open: boolean,
    setOpen: (value: boolean) => void,
    showMenu: boolean,
    setShowMenu: (value: boolean) => void,
    darkMode: boolean,
    setDarkMode: (value: boolean) => void,
    menuRef: React.RefObject<HTMLDivElement | null>;
}

// Importar estados o componentes
import { Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { CartItem , Product} from "../types";

// Crear mi primer componente
export function Navbar({
    cart, removeFromCart, increaseQuantity, decreaseQuantity, 
    clearCart, open, setOpen, isEmpty, total, showMenu, setShowMenu, 
    menuRef, darkMode, setDarkMode
    } : NavbarProps) {
    
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
                    <a href="/" className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-50">Home</a>
                    <a href="/" className="text-sm font-bold text-gray-950 dark:text-gray-50">Products</a>
                    <a href="/" className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-50">Offers</a>
                    <a href="/" className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-50">Contact Us</a>
                </div>
                {/* Carrito y perfil de usuario */}
                <div className="flex items-center gap-2">
                    {/* Boton para el carrito de compras */}
                    <button type="button" className="relative text-gray-500 hover:text-gray-950 hover:bg-gray-100 rounded-full p-2 dark:text-neutral-400 dark:hover:bg-gray-900 dark:hover:text-neutral-50" onClick={() => setOpen(true)}>
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
                    <div className="relative" ref={menuRef}>
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-950 hover:bg-gray-50 rounded-full p-2 dark:text-neutral-400 dark:hover:bg-gray-900 dark:hover:text-neutral-50"
                            onClick={() => setShowMenu(!showMenu)} // alternar visibilidad
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

                        {/* Menú desplegable */}
                        {showMenu && (
                            <div className="absolute -right-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 dark:bg-gray-950 dark:border-gray-900">
                            <button
                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-900"
                            >   
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                My Profile
                            </button>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-900"
                            >
                                {darkMode ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                        </svg>
                                        Light
                                    </>
                                
                                    ):(
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                        </svg>
                                        Dark
                                    </>
                                )}
                            </button>
                            <button
                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-900"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                                </svg>
                                Log out
                            </button>
                            </div>
                        )}
                    </div>         
                    {/* Boton para abrir el menu lateral en mobile */}
                    <button type="button" className="lg:hidden block text-gray-500 hover:text-gray-950 hover:bg-gray-50 rounded-full p-2 dark:text-neutral-400 dark:hover:bg-gray-900 dark:hover:text-neutral-50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 md:size-5" aria-label="boton para abrir el menu">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Drawer checkout carrito */}
            <Transition show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={setOpen}>
                    {/* Overlay */}
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500/60 dark:bg-gray-900/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex pl-10 sm:pl-16">
                                {/* Panel lateral */}
                                <Transition.Child
                                        as="div"
                                        enter="transform transition ease-in-out duration-300 sm:duration-500"
                                        enterFrom="translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transform transition ease-in-out duration-300 sm:duration-500"
                                        leaveFrom="translate-x-0"
                                        leaveTo="translate-x-full"
                                    >
                                    <Dialog.Panel className="pointer-events-auto w-full md:w-screen max-w-md bg-white shadow-xl flex flex-col h-full dark:bg-gray-950">
                                        {/* Header */}
                                        <div className="flex items-center justify-between p-[1.15rem] sm:px-6 border-b border-gray-200 dark:border-gray-900">
                                            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-50">
                                                Shopping Cart
                                            </Dialog.Title>
                                            <button
                                                onClick={() => setOpen(false)}
                                                className="text-gray-400 hover:text-gray-600"
                                            >
                                                <XMarkIcon className="w-6 h-6" />
                                            </button>
                                        </div>
                                        {isEmpty ? (
                                            <div className="flex flex-col items-center justify-center gap-3 h-full px-2 py-6">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-16 text-gray-500">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                </svg>  
                                                <div className="flex flex-col items-center justify-center">
                                                    <h4 className="text-xl font-semibold dark:text-gray-50">No products</h4>
                                                    <p className="text-center text-sm text-gray-500">Start by creating a new product new to your shopping cart to view it</p>
                                                </div>
                                                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 bg-gray-950 text-white font-semibold text-sm hover:bg-gray-800 rounded-md dark:bg-blue-600 dark:hover:bg-blue-600/90">
                                                    Continue shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                            {/* Contenido del carrito con scroll */}
                                            <div className="flex-1 overflow-y-auto px-2 flow-root">
                                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-900">
                                                {cart.map(product => (
                                                    <li key={product.id} className="flex flex-1 w-full items-center gap-3 p-3">
                                                        <div className="size-24 flex items-center justify-center shrink-0 overflow-hidden rounded-md bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
                                                            <img alt="imagen del producto" src={`/img/${product.image}.webp`} className="object-contain w-full h-20" />
                                                        </div>
                                                        <div className="flex flex-1 flex-col items-start gap-2">
                                                            <div className="flex items-center justify-between gap-2 w-full">
                                                                <h4 className="font-semibold text-sm line-clamp-1 dark:text-gray-50">{product.name}</h4>
                                                                <p className="text-sm font-semibold dark:text-gray-50">${product.price}</p>
                                                            </div>
                                                            <p className="text-xs text-gray-500 line-clamp-2 dark:text-gray-400">{product.description}</p>
                                                            <div className="flex items-center justify-between gap-2 w-full">
                                                                <div className="flex items-center gap-2">
                                                                    <button type="button" onClick={() => decreaseQuantity(product.id)} className="bg-gray-950 hover:bg-gray-800 text-white p-1 rounded-full size-5 flex items-center justify-center dark:bg-gray-800 dark:hover:bg-gray-800/90">
                                                                        -
                                                                    </button>
                                                                    <p className="text-sm font-semibold text-center w-2 dark:text-gray-50">{product.quantity}</p>
                                                                    <button type="button" onClick={() => increaseQuantity(product.id)} className="bg-gray-950 hover:bg-gray-800 text-white p-1 rounded-full dark:bg-gray-800 dark:hover:bg-gray-800/90">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-3">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                                <button type="button" className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-400" onClick={() => removeFromCart(product.id)}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                                </ul>
                                            </div>
                                            {/* Subtotal y Checkout fijo abajo */}
                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 dark:border-gray-800">
                                                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-50">
                                                    <p>Subtotal</p>
                                                    <p>${total.toFixed(2)}</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                                                    Shipping costs increase by <span className="font-bold text-gray-950 dark:text-gray-50">5%</span> with each order
                                                </p>
                                                <div className="mt-6">
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            setOpen(false);
                                                            clearCart();
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