import React, { createContext, useState, useCallback } from 'react';

export const ToastContext = createContext()

const ToastProvider = (props) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, [])

    const addToast = useCallback((message, type = 'info', timeout = 5000) => {
        const id = Date.now()
        const newToast = {
            id: id,
            message,
            type,
        };

        setToasts((prevToasts) => [...prevToasts, newToast]);

        setTimeout(() => {
            removeToast(id)
        }, timeout);

        return id
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {props.children}
        </ToastContext.Provider>
    );
}

export default ToastProvider