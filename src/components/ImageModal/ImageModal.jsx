import React, { useEffect } from "react";
import ReactModal from "react-modal";
import css from "./ImageModal.module.css";

const ImageModal = ({ isOpen, closeModal, image }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnEsc={true}
      overlayClassName={css.Overlay}
      className={css.Modal}
      shouldCloseOnOverlayClick={true}
    >
      <div className={css.imgContainer}>
        {image && (
          <img src={image.urls.regular} alt="Selected" className={css.img} />
        )}
      </div>
    </ReactModal>
  );
};

export default ImageModal;
