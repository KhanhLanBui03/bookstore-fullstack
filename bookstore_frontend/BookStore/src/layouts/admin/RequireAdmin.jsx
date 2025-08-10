import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RequireAdmin = (WrappedComponent) => {
    const WithAdminCheck = (props) => {
        const navigate = useNavigate();
        const [checking, setChecking] = useState(true); // kiểm tra xong chưa

        useEffect(() => {
            const token = localStorage.getItem('token');
            console.log("Token: " + token);

            if (!token) {
                navigate("/login");
                
            }

            try {
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                if (!decodedToken.isAdmin) {
                    navigate("/bao-loi-403");
                    return null;
                }
            } catch (err) {
                console.error("Lỗi giải mã token:", err);
                navigate("/login");
            } finally {
                setChecking(false);
            }
        }, [navigate]);

        if (checking) return null; // hoặc <div>Loading...</div>

        return <WrappedComponent {...props} />;
    };

    return WithAdminCheck;
};

export default RequireAdmin;
