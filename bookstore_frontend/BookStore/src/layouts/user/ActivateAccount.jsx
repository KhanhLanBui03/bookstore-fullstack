import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ActivateAccount = () => {
    const { email, activateId } = useParams();
    const [activated, setActivated] = useState(false);
    const [thongBao, setThongBao] = useState("");

    useEffect(() => {
        if (email && activateId) {
            thucHienKichHoat();
        }
    }, []);

    const thucHienKichHoat = async () => {
        try {
            const url = `http://localhost:8080/account/activate?email=${email}&activateId=${activateId}`;
            const response = await fetch(url, { method: "GET" });

            if (response.ok) {
                setActivated(true);
            } else {
                const text = await response.text();
                setThongBao(text);
            }
        } catch (error) {
            console.log("Lỗi khi kích hoạt: ", error);
            setThongBao("Lỗi kết nối đến máy chủ.");
        }
    };

    return (
        <div style={{ padding: "30px", textAlign: "center" }}>
            {activated ? (
                <h2 style={{ color: "green" }}>Tài khoản đã được kích hoạt thành công ✅</h2>
            ) : (
                <h2 style={{ color: "red" }}>{thongBao || "Đang kích hoạt tài khoản..."}</h2>
            )}
        </div>
    );
};

export default ActivateAccount;
