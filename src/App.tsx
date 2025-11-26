// Importamos los componentes
import { useEffect, useReducer, useRef } from "react";
import { FilterBar } from "./components/FilterBar";
import { Navbar } from "./components/Navbar"
import { cartReducer, initialCartState } from "./reducers/cart-reducer";
import { Product } from "./components/Product";
import type { Filter } from "./types";
import { Toast } from "./components/Toast";

function App() {

  // Inicializa el estado del carrito usando el reducer y el estado inicial.
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // useEffect para sincronizar el carrito con local storage
  useEffect(() => {
    // Cada vez que el carrito cambie, se guarda en LocalStorage
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Guardar tema en localStorage cuando cambie
  useEffect(() => {
    const theme = state.darkMode ? "dark" : "light";
    localStorage.setItem("theme", theme);

    // Aplicar clase al <html>
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.darkMode]);

  // Definimos la funcion despachadora
  const handleFilter = (filter: Filter) => {
    dispatch({
      type: "set_filter",
      payload: {
        category: filter.category,
        search: filter.search,
      }
    });
  };

  const filteredProducts = state.data.filter(product => {
    // Filtrar por categoría si hay una seleccionada
    if (state.filter.category && product.category !== state.filter.category) {
      return false;
    }

    // Filtrar por texto si existe
    if (state.filter.search.trim() !== "") {
      return product.name.toLowerCase().includes(state.filter.search.toLowerCase());
    }

    return true;
  });

  // Referencia para detectar clicks fuera del menu
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Evento para manejar el click fuera del menu del usuario 
  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (state.showMenu && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        dispatch({ type: "toggle_menu" });
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [state.showMenu, dispatch]);

  // Funcion del Toast 
  const handleCloseToast = () => {
    dispatch({ type: "hide_toast" });
  }
  return (
    <>
      {/* enderizar el Toast */}
      <Toast
        message={state.toast.message}
        description={state.toast.description}
        show={state.toast.show}
        onClose={handleCloseToast} // Pasamos la función que usa dispatch
      />

      <Navbar
        cart={state.cart}
        open={state.open}
        showMenu={state.showMenu}
        menuRef={menuRef}
        dispatch={dispatch}
        darkMode={state.darkMode}
      />
      <header className="relative left-0 right-0 w-full h-[45rem] overflow-hidden shadow-lg">
        <img src="/img/header-bg.webp" alt="imagen del header" loading="lazy" className="w-full h-full object-cover object-center brightness-75" />
        <div className="absolute inset-0 bg-black/40 px-4 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-6xl font-bold mb-2 max-w-3xl">The future of technology, straight to your cart</h1>
          <p className="text-lg text-gray-300">Discover the most innovative gadgets, smart accessories and the latest in electronics, all just a click away.</p>
        </div>
      </header>
      {/* Seccion de productos y filtros */}
      <div className="max-w-7xl mx-auto px-2 mt-10">
        <h2 className="text-5xl font-bold dark:text-gray-50">Our products</h2>
        <div className="mt-5">
          {/* FilterBar: pasa la función para manejar el filtro */}
          <FilterBar
            setFilter={handleFilter}
          />
          {/* Iterar sobre el arreglo de food para el componente de product */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 py-8">
            {filteredProducts.map(item => (
              <Product
                key={item.id}
                product={item}
                dispatch={dispatch}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer de mi app */}
      <footer className="bg-gray-950 text-gray-300 mt-16 border-t dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Columna 1 - Logo / descripción */}
          <div className="w-full">
            {/* Logotipo y nombre */}
            <div className="flex items-center gap-2 pb-4">
              <img src="/img/logotipo-techsy.webp" alt="logotipo de la empresa" className="w-8 h-8 invert" />
              <h3 className="font-bold m-0 text-2xl text-white">Techsy</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Discover the latest Apple technology. iPhones, MacBooks, AirPods — all designed for innovation, performance, and style.
            </p>
            {/* Social media */}
            <div className="flex items-center gap-7 mt-5">
              <a href="/" aria-label="link media">
                <svg className="w-6 h-6 text-gray-100 hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="/" aria-label="link media">
                <svg className="w-6 h-6 text-gray-100 hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="/" aria-label="link media">
                <svg className="w-6 h-6 text-gray-100 hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                </svg>
              </a>
              <a href="/" aria-label="link media">
                <svg className="w-6 h-6 text-gray-100 hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-7 md:mt-0">
            {/* Columna 2 - links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Offers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Columna 3 - Support */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">ticket</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Comunnity</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
              </ul>
            </div>

            {/* Columna 2 - Company */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>

            {/* Columna 3 - Legal */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Terms of service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">License</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-gray-900 mt-6">
          <p className="text-center text-gray-300 text-sm py-4">
            © {new Date().getFullYear()} Techsy. All rights reserved Marco cruz.
          </p>
        </div>
      </footer>
    </>
  )
}
export default App
