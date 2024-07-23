import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";
import styles from "./menuItem.module.css";

const MenuItemModal = ({
  item,
  modalIsOpen,
  onClose,
  cartDispatch,
  action,
}) => {
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
      <MenuItem
        item={item}
        onClose={onClose}
        modalIsOpen={modalIsOpen}
        cartDispatch={cartDispatch}
        action={action}
      />
    </dialog>
  );
};

MenuItemModal.propTypes = {
  item: PropTypes.object,
  modalIsOpen: PropTypes.bool,
  onClose: PropTypes.func,
  cartDispatch: PropTypes.func,
  action: PropTypes.string,
};

export default MenuItemModal;
