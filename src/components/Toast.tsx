// Creamos nuestro type
type ToastProps = {
    message: string,
    description: string,
    show: boolean, 
    onClose: () => void
}

// Importar librerias 
import { useEffect } from "react";

export function Toast({message, description, show, onClose} : ToastProps) {
    // usar el useEffect
    useEffect(() => {
        if (show) {
        const timer = setTimeout(() => onClose(), 2000);
        return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <div className={`fixed top-20 right-0 mx-2 z-50 border border-gray-200 rounded-xl transition-all duration-500 dark:border-gray-800 ${
            show ? 
            "opacity-100 translate-x-0" 
            : 
            "opacity-0 translate-x-10 pointer-events-none"
            }`}
            >
            <div className="bg-white text-gray-900 px-5 py-3 rounded-xl shadow-lg flex items-start gap-3 dark:text-gray-50 dark:bg-gray-900">
                <div className="bg-green-600/10 p-2 rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-4 h-4 text-green-600"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <span className="font-medium dark:text-gray-50">{message}</span>
                    <span className="text-gray-500 text-sm dark:text-gray-400">{description}</span>
                </div>
            </div>
        </div>
    )
}