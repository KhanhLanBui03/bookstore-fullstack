import React from 'react'

const Pagination = ({ trangHienTai, tongSoTrang, phanTrang }) => {
    const danhSachTrang = [];

    if (trangHienTai === 1) {
        danhSachTrang.push(trangHienTai);
        if (tongSoTrang >= trangHienTai + 1) {
            danhSachTrang.push(trangHienTai + 1);
        }
        if (tongSoTrang >= trangHienTai + 2) {
            danhSachTrang.push(trangHienTai + 2);
        }
    } else if (trangHienTai > 1) {
        if (trangHienTai >= 3) {
            danhSachTrang.push(trangHienTai - 2);
        }
        if (trangHienTai >= 2) {
            danhSachTrang.push(trangHienTai - 1);
        }
        danhSachTrang.push(trangHienTai);
        if (tongSoTrang >= trangHienTai + 1) {
            danhSachTrang.push(trangHienTai + 1);
        }
        if (tongSoTrang >= trangHienTai + 2) {
            danhSachTrang.push(trangHienTai + 2);
        }
    }
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className="page-item" onClick={() => phanTrang(1)}>
                    <button className="page-link">Trang Đầu</button>
                </li>
                {danhSachTrang.map((trang) => (
                    <li className="page-item" key={trang} onClick={() => phanTrang(trang)}>
                        <button className={`page-link ${trangHienTai === trang ? "active" : ""}`}>
                            {trang}
                        </button>
                    </li>
                ))}
                <li className="page-item" onClick={() => phanTrang(tongSoTrang)}>
                    <button className="page-link">Trang Cuối</button>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination
