import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import MenuItem from "../MenuItem/MenuItem";
import styles from "./itemDialog.module.css";

const ItemDialog = ({ item, modalIsOpen, onClose, action }) => {
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
          action={action}
          modalIsOpen={modalIsOpen}
          modalRef={modalRef}
        />
      </dialog>
    </div>
  );
};

ItemDialog.propTypes = {
  item: PropTypes.object,
  modalIsOpen: PropTypes.bool,
  onClose: PropTypes.func,
  action: PropTypes.string,
};

export default ItemDialog;
