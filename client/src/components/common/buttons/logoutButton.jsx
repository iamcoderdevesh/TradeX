import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Toast } from 'components/common/alerts';
import { useLogoutMutation } from 'state/api/auth/authApi';
import { useSelector } from 'react-redux';

const LogoutButton = () => {

    const navigate = useNavigate();
    const [logout, { isLoading, isSuccess, data }] = useLogoutMutation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleLogout = async () => {
        if(isAuthenticated) {
            try {
                await logout().unwrap();
                Toast.success("Logout Successfully!!!");
                navigate('/auth/login');
            } catch (error) {
                return;
            }
        }
        return;
    }

    return (
        <div onClick={handleLogout}>
            <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</span>
        </div>
    )
}

export default LogoutButton;
