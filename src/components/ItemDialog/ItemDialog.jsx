import { useRef, useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";
import styles from "./itemDialog.module.css";
import { itemReducer, initialItemState } from "./itemReducer";
import ItemDialogHeader from "./ItemDialogHeader";
import ItemDialogBody from "./ItemDialogBody";
import ItemDialogFooter from "./ItemDialogFooter";
import { useMatch } from "react-router-dom";

const ItemDialog = ({ item, modalIsOpen, onClose }) => {
  const isCart = useMatch("/cart");
  const isMenu = useMatch("/");
  const [itemState, itemDispatch] = useReducer(itemReducer, initialItemState);
  const [animationPercentage, setAnimationPercentage] = useState(0);
  const [bodyScrollFromTop, setBodyScrollFromTop] = useState(0);
  const [initialHeaderSize, setInitialHeaderSize] = useState(0);

  const modalRef = useRef();
  const headerRef = useRef();

  // # Handle dialog
  useEffect(() => {
    if (item) {
      handleDialog();
      initializeItem(item);
    }
  }, [item]);

  // Handle header/scroll
  useEffect(() => {
    if (item) {
      setInitialHeaderSize(headerRef.current?.offsetHeight);
      setBodyScrollFromTop(0);
      setAnimationPercentage(0);
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

  const handleContentScroll = (e) => {
    // Calculate scrolled from top percentage
    const viewHeight = e.target.offsetHeight;
    const totalHeight = e.target.scrollHeight;
    const scrollableHeight = totalHeight - viewHeight;
    const scrollTop = e.target.scrollTop;

    // Calc animationLengthPx
    const headerMinHeightPx = 64;
    const animationLengthPx = initialHeaderSize - headerMinHeightPx;

    if (animationLengthPx <= 0) return;
    if (scrollableHeight <= 0) return;

    const animationPercentage = Math.round(
      (scrollTop / animationLengthPx) * 100
    );
    setAnimationPercentage(Math.min(100, animationPercentage));
    setBodyScrollFromTop(scrollTop);
  };

  return (
    <>
      {item && (
        <dialog
          ref={modalRef}
          className={styles.itemDialog}
          onClick={(e) => (e.target === modalRef.current ? onClose() : null)}
          onKeyDown={(e) => (e.key === "Escape" ? onClose() : null)}
        >
          <div
            className={styles.menuItemContainer}
            onScroll={handleContentScroll}
            style={{ paddingTop: `${initialHeaderSize}px` }}
          >
            <ItemDialogHeader
              ref={headerRef}
              item={item}
              onClose={onClose}
              modalRef={modalRef}
              animationPercentage={animationPercentage}
              bodyScrollFromTop={bodyScrollFromTop}
            />
            <ItemDialogBody
              item={item}
              itemState={itemState}
              itemDispatch={itemDispatch}
            />
            <ItemDialogFooter
              item={item}
              itemState={itemState}
              itemDispatch={itemDispatch}
              isCart={isCart}
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
};

export default ItemDialog;
