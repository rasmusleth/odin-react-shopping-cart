import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import MenuItem from "../MenuItem/MenuItem";
import styles from "./itemDialog.module.css";

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
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
      modalRef.current.style.transform = "";
      modalRef.current.style.transition = "transform 200ms ease-out";
    }
  }, [modalIsOpen]);

  return (
    <div>
      <dialog
        ref={modalRef}
        className={styles.itemDialog}
        onCancel={onClose}
        onClick={(e) => (e.target === modalRef.current ? onClose() : null)}
      >
        <MenuItem
          item={item}
          onClose={onClose}
          cartDispatch={cartDispatch}
          action={action}
          modalIsOpen={modalIsOpen}
          modalRef={modalRef}
        />
      </dialog>
    </div>
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
