import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";
import styles from "./menu.module.css";

const MenuItemModal = ({ item, modalIsOpen, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    if (modalIsOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [modalIsOpen]);

  return (
    <dialog
      ref={modalRef}
      className={styles.itemDialog}
      onCancel={onClose}
      onClick={(e) => (e.target === modalRef.current ? onClose() : null)}
    >
      <MenuItem item={item} onClose={onClose} />
    </dialog>
  );
};

MenuItemModal.propTypes = {
  item: PropTypes.object,
  modalIsOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default MenuItemModal;
