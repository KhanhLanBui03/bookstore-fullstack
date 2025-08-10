import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sex, setSex] = useState('');
  const [avatar, setAvatar] = useState(null);
  // const [activated, setActivated] = useState(0)
  // const [activateId, setActivateId] = useState('')
  // Errors
  const [errorUsername, setErrorUsername] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [errorAvatar, setErrorAvatar] = useState('');
  // const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [notification, setNotification] = useState('')

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result ? reader.result : null);
      reader.onerror = error => reject(error);
    });
  }
  const handleSubmit = async (e) => {


    // Reset lỗi
    setErrorUsername('');
    setErrorEmail('');
    setErrorPassword('');
    setErrorConfirmPassword('');
    e.preventDefault();

    const isTenDangNhapValid = !await kiemTraTenDangNhapDaTonTai(username);
    const isEmailValid = !await kiemTraEmailDaTonTai(email);
    const isMatKhauValid = !kiemTraMatKhau(password);
    const isMatKhauLapLaiValid = !kiemTraMatKhauLapLai(confirmPassword);

    if (isTenDangNhapValid && isEmailValid && isMatKhauValid && isMatKhauLapLaiValid) {
      try {
        const url = 'http://localhost:8080/account/register';

        // Tạo object data để gửi
        const userData = {
          username,
          email,
          password,
          firstName,
          lastName,
          phoneNumber,
          sex,
          activateId: '',
          activated: 0
        };
        
        // Nếu có avatar, chuyển đổi thành base64
        if (avatar) {
          try {
            const base64Avatar = await getBase64(avatar);
            userData.avatar = base64Avatar;
          } catch (error) {
            console.error('Lỗi khi chuyển đổi avatar:', error);
            setErrorAvatar('Lỗi khi xử lý file avatar');
            return;
          }
        }

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });

        if (response.ok) {
          setNotification("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt!");
        } else {
          console.log(response.json());
          setNotification("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
        }
      } catch (error) {
        setNotification("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.",error)
      }
    }
  };
  // KIỂM TRA TÊN ĐĂNG NHẬP ////////////////////////////////////////////////
  const kiemTraTenDangNhapDaTonTai = async (username) => {
    // end-point
    const url = `http://localhost:8080/user/search/existsByUsername?username=${username}`;
    console.log(url);
    // call api
    try {
      const response = await fetch(url);
      const data = await response.text();
      if (data === "true") {
        setErrorUsername("Tên đăng nhập đã tồn tại!");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Lỗi khi kiểm tra tên đăng nhập:", error);
      return false; // Xảy ra lỗi
    }
  }
  const handleUsernameChange = (e) => {
    // Thay đổi giá trị
    setUsername(e.target.value);
    // Kiểm tra
    setErrorUsername('');
    // Kiểm tra sự tồn tại
    return kiemTraTenDangNhapDaTonTai(e.target.value);
  }
  const kiemTraEmailDaTonTai = async (email) => {

    // end-point
    const url = `http://localhost:8080/user/search/existsByEmail?email=${email}`;
    console.log(url);
    // call api
    try {
      const response = await fetch(url);
      const data = await response.text();
      if (data === "true") {
        setErrorEmail("Email đã tồn tại!");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Lỗi khi kiểm tra email:", error);
      return false; // Xảy ra lỗi
    }
  }
  const handleEmailChange = (e) => {
    // Thay đổi giá trị
    setEmail(e.target.value);
    // Kiểm tra
    setErrorEmail('');
    // Kiểm tra sự tồn tại
    return kiemTraEmailDaTonTai(e.target.value);
  }
  const kiemTraMatKhau = (matKhau) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(matKhau)) {
      setErrorPassword("Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)");
      return true;
    } else {
      setErrorPassword(""); // Mật khẩu hợp lệ
      return false;
    }
  }
  const handlePasswordChange = (e) => {
    // Thay đổi giá trị
    setPassword(e.target.value);
    // Kiểm tra
    setErrorPassword('');
    // Kiểm tra sự tồn tại
    return kiemTraMatKhau(e.target.value);
  }
  const kiemTraMatKhauLapLai = (matKhauLapLai) => {
    if (matKhauLapLai !== password) {
      setErrorConfirmPassword("Mật khẩu không trùng khớp.");
      return true;
    } else {
      setErrorConfirmPassword(""); // Mật khẩu trùng khớp
      return false;
    }
  }
  const handleConfirmPasswordChange = (e) => {
    // Thay đổi giá trị
    setConfirmPassword(e.target.value);
    // Kiểm tra
    setErrorConfirmPassword('');
    // Kiểm tra sự tồn tại
    return kiemTraMatKhauLapLai(e.target.value);
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Kiểm tra loại file
      if (!file.type.startsWith('image/')) {
        setErrorAvatar('Vui lòng chọn file hình ảnh hợp lệ');
        return;
      }
      // Kiểm tra kích thước file (giới hạn 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorAvatar('Kích thước file không được vượt quá 5MB');
        return;
      }
      setAvatar(file);
      setErrorAvatar('');
    }
  }


  return (
    <div className="register-bg-xinxo d-flex justify-content-center align-items-center py-5">
      <style>{`
        .register-bg-xinxo {
          min-height: 100vh;
          background: linear-gradient(120deg, #ff416c 0%, #ff4b2b 100%);
          animation: registerFadeIn 1.2s;
        }
        @keyframes registerFadeIn {
          0% { opacity: 0; transform: scale(1.05);}
          100% { opacity: 1; transform: scale(1);}
        }
        .register-card-xinxo {
          background: var(--card-bg, #fff);
          border-radius: 28px;
          box-shadow: 0 8px 32px #ff416c33, 0 1.5px 8px #ff4b2b22;
          padding: 0;
          width: 100%;
          max-width: 980px;
          overflow: hidden;
          display: flex;
          min-height: 600px;
        }
        .register-img-xinxo {
          object-fit: cover;
          height: 100%;
          width: 100%;
        }
        .register-form-xinxo {
          padding: 48px 36px 36px 36px;
          flex: 1;
          background: var(--card-bg, #fff);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .register-logo-xinxo {
          width: 80px;
          height: 80px;
          border-radius: 18px;
          box-shadow: 0 2px 12px #ff416c22;
          margin: 0 auto 18px auto;
          display: block;
        }
        .register-title-xinxo {
          text-align: center;
          margin-bottom: 18px;
          color: #ff416c;
          font-weight: 800;
          font-size: 2rem;
          letter-spacing: 1px;
          text-shadow: 0 2px 8px #ff416c22;
        }
        .register-form-xinxo label {
          font-weight: 600;
          color: #ff416c;
        }
        .register-form-xinxo .form-control {
          border-radius: 14px;
          border: 1.5px solid #ffe3ec;
          font-size: 1.05rem;
          padding: 10px 14px;
          background: #fff;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .register-form-xinxo .form-control:focus {
          border-color: #ff416c;
          box-shadow: 0 2px 12px #ff416c22;
        }
        .register-form-xinxo .btn-register-xinxo {
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
        .register-form-xinxo .btn-register-xinxo:hover {
          background: linear-gradient(90deg, #ff4b2b 0%, #ff416c 100%);
          box-shadow: 0 8px 24px #ff416c33;
        }
        .register-form-xinxo .error-msg {
          color: #ff416c;
          font-size: 0.97rem;
          margin-top: 2px;
        }
        .register-form-xinxo .success-msg {
          color: #43e97b;
          font-size: 1rem;
          margin-top: 12px;
          text-align: center;
        }
        @media (max-width: 900px) {
          .register-card-xinxo { flex-direction: column; min-height: unset; }
          .register-img-xinxo { display: none; }
        }
        @media (max-width: 600px) {
          .register-form-xinxo { padding: 22px 6px 18px 6px; }
        }
        body.dark .register-card-xinxo,
        body.dark .register-form-xinxo {
          background: var(--card-bg, #23272f);
          color: #fff;
        }
        body.dark .register-form-xinxo .form-control {
          background: #23272f;
          color: #fff;
          border-color: #ff416c44;
        }
        body.dark .register-form-xinxo label,
        body.dark .register-title-xinxo {
          color: #ff8fa3;
        }
        body.dark .register-form-xinxo .btn-register-xinxo {
          background: linear-gradient(90deg, #232526 0%, #ff416c 100%);
        }
        body.dark .register-form-xinxo .btn-register-xinxo:hover {
          background: linear-gradient(90deg, #ff4b2b 0%, #232526 100%);
        }
      `}</style>
      <div className="register-card-xinxo">
        {/* Hình ảnh bên trái */}
        <div className="d-none d-md-block" style={{ flex: 1, minWidth: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80"
            alt="Register"
            className="register-img-xinxo"
            style={{ height: '100%', width: '100%' }}
          />
        </div>
        {/* Form đăng ký */}
        <div className="register-card-xinxo">
        {/* Bỏ hình ảnh bên trái, chỉ còn form đăng ký chiếm toàn bộ */}
        <div className="register-form-xinxo" style={{ width: "100%" }}>
          <img src="/img/logo2.png" alt="Logo" className="register-logo-xinxo" />
          <div className="register-title-xinxo">Đăng ký tài khoản</div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên đăng nhập</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              {errorUsername && <div className="error-msg">{errorUsername}</div>}
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Họ đệm</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Tên</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* Giới tính */}
            <div className="mb-3">
              <label className="form-label d-block">Giới tính</label>
              {["Nam", "Nữ", "Khác"].map((option) => (
                <div className="form-check form-check-inline" key={option}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="sex"
                    id={`sex-${option}`}
                    value={option}
                    checked={sex === option}
                    onChange={(e) => setSex(e.target.value)}
                    required
                  />
                  <label className="form-check-label" htmlFor={`sex-${option}`}>{option}</label>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <label className="form-label">Số điện thoại</label>
              <input
                type="tel"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {errorEmail && <div className="error-msg">{errorEmail}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Avatar</label>
              <input
                type="file"
                className="form-control"
                accept='image/*'
                onChange={handleAvatarChange}
                required
              />
              {errorAvatar && <div className="error-msg">{errorAvatar}</div>}
            </div>
            <div className="mb-3">
              <label className="form-label">Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {errorPassword && <div className="error-msg">{errorPassword}</div>}
            </div>
            <div className="mb-4">
              <label className="form-label">Nhập lại mật khẩu</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              {errorConfirmPassword && <div className="error-msg">{errorConfirmPassword}</div>}
            </div>
            <button type="submit" className="btn btn-register-xinxo w-100">Đăng ký</button>
            {notification && <div className="success-msg">{notification}</div>}
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Register;
