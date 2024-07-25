import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import MenuItem from "./MenuItem";
import styles from "./menuItem.module.css";
import { createPortal } from "react-dom";

const portalElement = document.getElementById("overlays");

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
    <>
      {createPortal(
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
            />
          </dialog>
        </div>,
        portalElement
      )}
    </>
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
