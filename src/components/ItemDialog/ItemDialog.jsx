import { useRef, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import styles from "./itemDialog.module.css";
import { itemReducer, initialItemState } from "./itemReducer";
import ItemDialogHeader from "./ItemDialogHeader";
import ItemDialogBody from "./ItemDialogBody";
import ItemDialogFooter from "./ItemDialogFooter";
import { useMatch } from "react-router-dom";

const ItemDialog = ({ item, modalIsOpen, onClose, action }) => {
  const isCart = useMatch("/cart");
  const isMenu = useMatch("/");
  const [itemState, itemDispatch] = useReducer(itemReducer, initialItemState);

  const modalRef = useRef();
  const headerRef = useRef();

  // # Handle dialog
  useEffect(() => {
    if (item) {
      handleDialog();
      initializeItem(item);
    }
  }, [item]);

  const handleDialog = () => {
    if (modalIsOpen) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
      modalRef.current.style.transform = "";
      modalRef.current.style.transition = "transform 200ms ease-out";
    }
  };

  const initializeItem = (item) => {
    if (modalIsOpen && isMenu) {
      itemDispatch({
        type: "init_item",
        item: item,
      });
    } else if (modalIsOpen && isCart) {
      itemDispatch({
        type: "init_cart_item",
        cartItem: item,
      });
    }
  };

  return (
    <>
      {item && (
        <dialog
          ref={modalRef}
          className={styles.itemDialog}
          onClick={(e) => (e.target === modalRef.current ? onClose() : null)}
        >
          <div className={styles.menuItemContainer}>
            <ItemDialogHeader
              ref={headerRef}
              item={item}
              onClose={onClose}
              modalRef={modalRef}
            />
            <ItemDialogBody
              item={item}
              itemState={itemState}
              itemDispatch={itemDispatch}
              headerRef={headerRef}
            />
            <ItemDialogFooter
              item={item}
              itemState={itemState}
              itemDispatch={itemDispatch}
              action={action}
              onClose={onClose}
            />
          </div>
        </dialog>
      )}
    </>
  );
};

ItemDialog.propTypes = {
  item: PropTypes.object,
  modalIsOpen: PropTypes.bool,
  onClose: PropTypes.func,
  action: PropTypes.string,
};

export default ItemDialog;
