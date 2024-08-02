import { useRef, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import styles from "./itemDialog.module.css";
import { itemReducer, initialItemState } from "./itemReducer";
import ItemDialogHeader from "./ItemDialogHeader";
import ItemDialogBody from "./ItemDialogBody";
import ItemDialogFooter from "./ItemDialogFooter";

const ItemDialog = ({ item, modalIsOpen, onClose, action }) => {
  const [itemState, itemDispatch] = useReducer(
    itemReducer,
    action === "edit" ? item : initialItemState
  );

  const modalRef = useRef();
  const headerRef = useRef();

  // # Handle dialog
  useEffect(() => {
    if (item) {
      if (modalIsOpen) {
        modalRef.current.showModal();

        if (action !== "edit") {
          itemDispatch({
            type: "init_item",
            item: item,
          });
        }
      } else {
        modalRef.current.close();
        modalRef.current.style.transform = "";
        modalRef.current.style.transition = "transform 200ms ease-out";
      }
    }
  }, [modalIsOpen, action, item]);

  // useEffect(() => {
  //   if (modalIsOpen) {
  //     if (action !== "edit") {
  //       itemDispatch({
  //         type: "init_item",
  //         item: item,
  //       });
  //     }
  //   }
  // }, [modalIsOpen, action, item]);

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
