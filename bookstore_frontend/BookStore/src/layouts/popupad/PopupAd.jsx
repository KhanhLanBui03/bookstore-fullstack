import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5";

const PopupAd = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Kiểm tra nếu đã hiện popup trong session này thì không hiện nữa
    if (!sessionStorage.getItem("popupAdShown")) {
      const timeout = setTimeout(() => {
        setShow(true);
        sessionStorage.setItem("popupAdShown", "1");
      }, 1000); // Hiện sau 1s
      return () => clearTimeout(timeout);
    }
  }, []);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-center p-0">
        <div className="position-relative">
          <img
            src="./img/qc.webp"
            alt="Quảng cáo"
            className="img-fluid"
          />
          <Button
            variant="light"
            className="position-absolute top-0 end-0 m-2"
            onClick={handleClose}
          >
            <IoClose />
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PopupAd;