import { useEffect } from "react";

// Creamos el type para las props del componente
type ToastProps = {
    message: string;
    description: string;
    show: boolean;
    onClose: () => void;
}

export function Toast({ message, description, show, onClose} : ToastProps) {
    // Usar effect para manejar el temporizador del cierre
    useEffect(() => {
        if(show) {
            // Establecemos un temporizador de 2s para llamar onclose
            const timer = setTimeout(() => onClose(), 2500);
            return () => clearTimeout(timer); // Limpiamos el temporizador
        }
    }, [show, onClose]); // Dependencias

    return (
        <div className={`fixed top-20 right-0 mx-2 z-50 shadow-md flex items-start gap-3 bg-white p-4 border border-gray-200 rounded-xl transition-all duration-500 dark:bg-gray-900 dark:border-gray-800
            ${show ? 
                "opacity-100 translate-x-0"
            :   "opacity-0 translate-x-full pointer-events-none"
            }
        `}>
            <div className="bg-green-600/10 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
            </div>
            {/* Contenido del mensaje */}
            <div className="flex flex-col">
                <span className="font-medium dark:text-neutral-50">{message}</span>
                <span className="text-sm text-gray-500 dark:text-neutral-300">{description}</span>
            </div>
            {/* Boton para cerrar el toast */}
            <button 
                type="button"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 ml-2 dark:text-neutral-400 dark:hover:text-neutral-200"
            >  
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}