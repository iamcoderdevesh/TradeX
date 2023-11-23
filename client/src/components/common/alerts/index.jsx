import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = {
    error: (message) => toast.error(message, { type: "error", position: toast.POSITION.TOP_RIGHT }),
    info: (message) => toast.info(message, { type: "info", position: toast.POSITION.TOP_RIGHT }),
    success: (message) => toast.success(message, { type: "success", position: toast.POSITION.TOP_RIGHT }),
};

const CustomToastContainer = props => {

    return (
        <ToastContainer
            position="top-center"
            autoClose={5000}
            newestOnTop
            draggable
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange={false}
            pauseOnHover
            className="custom-toast-container"
        />
    )
}

export { CustomToastContainer as ToastContainer, Toast };