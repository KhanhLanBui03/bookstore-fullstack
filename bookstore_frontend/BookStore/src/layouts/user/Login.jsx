import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(atob(base64));
        } catch (e) {
            console.error('Lỗi parse JWT:', e);
            return null;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginRequest = {
            username: username,
            password: password,
        };

        try {
            const response = await fetch("http://localhost:8080/account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginRequest),
            });

            if (!response.ok) {
                throw new Error("Sai tên đăng nhập hoặc mật khẩu");
            }

            const data = await response.json();
            const token = data.jwt;
            localStorage.setItem("token", token);

            const jwtClaims = parseJwt(token);

            if (jwtClaims) {
                setMessage("Đăng nhập thành công!");
                setIsSuccess(true);

                const userInfo = {
                    username: jwtClaims.sub,
                    roles: jwtClaims.roles,
                    isAdmin: jwtClaims.isAdmin,
                };
                localStorage.setItem('user', JSON.stringify({ user: userInfo }));

                setTimeout(() => {
                    if (jwtClaims?.isAdmin) {
                        window.location.href = "/admin/dashboard";
                    } else {
                        window.location.href = "/";
                    }
                }, 1000);
            }
        } catch (error) {
            setMessage(error.message);
            setIsSuccess(false);
        }
    };

    return (
        <div className="login-bg-xinxo d-flex justify-content-center align-items-center">
            <style>{`
                .login-bg-xinxo {
                    min-height: 100vh;
                    background: linear-gradient(120deg, #ff416c 0%, #ff4b2b 100%);
                    animation: loginFadeIn 1.2s;
                }
                @keyframes loginFadeIn {
                    0% { opacity: 0; transform: scale(1.05);}
                    100% { opacity: 1; transform: scale(1);}
                }
                .login-card-xinxo {
                    background: var(--card-bg, #fff);
                    border-radius: 24px;
                    box-shadow: 0 8px 32px #ff416c33, 0 1.5px 8px #ff4b2b22;
                    padding: 38px 32px 32px 32px;
                    width: 100%;
                    max-width: 410px;
                    transition: box-shadow 0.2s;
                    position: relative;
                    overflow: hidden;
                }
                .login-card-xinxo::before {
                    content: "";
                    position: absolute;
                    top: -60px; left: -60px;
                    width: 120px; height: 120px;
                    background: linear-gradient(135deg, #ff416c55 0%, #ff4b2b33 100%);
                    border-radius: 50%;
                    z-index: 0;
                }
                .login-logo-xinxo {
                    width: 62px;
                    height: 62px;
                    border-radius: 16px;
                    box-shadow: 0 2px 12px #ff416c22;
                    margin: 0 auto 18px auto;
                    display: block;
                }
                .login-title-xinxo {
                    text-align: center;
                    margin-bottom: 18px;
                    color: #ff416c;
                    font-weight: 800;
                    font-size: 2rem;
                    letter-spacing: 1px;
                    text-shadow: 0 2px 8px #ff416c22;
                }
                .login-card-xinxo label {
                    font-weight: 600;
                    color: #ff416c;
                }
                .login-card-xinxo .form-control {
                    border-radius: 14px;
                    border: 1.5px solid #ffe3ec;
                    font-size: 1.05rem;
                    padding: 10px 14px;
                    background: #fff;
                    transition: border 0.2s, box-shadow 0.2s;
                }
                .login-card-xinxo .form-control:focus {
                    border-color: #ff416c;
                    box-shadow: 0 2px 12px #ff416c22;
                }
                .login-card-xinxo .btn-login-xinxo {
                    background: linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%);
                    color: #fff;
                    font-weight: 700;
                    border: none;
                    border-radius: 16px;
                    padding: 12px 0;
                    font-size: 1.1rem;
                    margin-top: 8px;
                    box-shadow: 0 2px 8px #ff416c33;
                    transition: background 0.18s, box-shadow 0.18s;
                }
                .login-card-xinxo .btn-login-xinxo:hover {
                    background: linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%);
                    box-shadow: 0 8px 24px #ff416c33;
                }
                .login-card-xinxo .forgot-link-xinxo {
                    color: #ff416c;
                    font-size: 0.97rem;
                    font-weight: 500;
                    text-decoration: none;
                    transition: color 0.18s;
                }
                .login-card-xinxo .forgot-link-xinxo:hover {
                    color: #ff4b2b;
                    text-decoration: underline;
                }
                .login-card-xinxo .alert {
                    border-radius: 12px;
                    font-size: 1rem;
                    margin-top: 18px;
                }
                .login-card-xinxo .register-xinxo {
                    text-align: center;
                    margin-top: 18px;
                    font-size: 1rem;
                }
                .login-card-xinxo .register-xinxo a {
                    color: #ff416c;
                    font-weight: 600;
                    text-decoration: none;
                    margin-left: 4px;
                }
                .login-card-xinxo .register-xinxo a:hover {
                    color: #ff4b2b;
                    text-decoration: underline;
                }
                @media (max-width: 600px) {
                    .login-card-xinxo { padding: 22px 6px 18px 6px; }
                }
                body.dark .login-card-xinxo {
                    background: var(--card-bg, #23272f);
                    color: #fff;
                }
                body.dark .login-card-xinxo .form-control {
                    background: #23272f;
                    color: #fff;
                    border-color: #ff416c44;
                }
                body.dark .login-card-xinxo label,
                body.dark .login-title-xinxo {
                    color: #ff8fa3;
                }
                body.dark .login-card-xinxo .btn-login-xinxo {
                    background: linear-gradient(90deg, #232526 0%, #ff416c 100%);
                }
                body.dark .login-card-xinxo .btn-login-xinxo:hover {
                    background: linear-gradient(90deg, #ff4b2b 0%, #232526 100%);
                }
            `}</style>
            <div className="login-card-xinxo shadow">
                <img src="/img/logo2.png" alt="Logo" className="login-logo-xinxo" />
                <div className="login-title-xinxo">Đăng nhập</div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Tên đăng nhập</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Nhập tên đăng nhập"
                            value={username}
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <Link to="/forgot-password" className="forgot-link-xinxo">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <button
                        type="button"
                        className="btn btn-login-xinxo w-100"
                        onClick={handleLogin}
                    >
                        Đăng nhập
                    </button>
                    {message && (
                        <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'} text-center`} role="alert">
                            {message}
                        </div>
                    )}
                    <div className="register-xinxo">
                        Chưa có tài khoản?
                        <Link to="/register">Đăng ký ngay</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;