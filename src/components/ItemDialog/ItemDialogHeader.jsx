import { useState, forwardRef, useEffect } from "react";
import styles from "./itemDialog.module.css";
import PropTypes from "prop-types";

const ItemDialogHeader = forwardRef(function ItemDialogHeader(
  { item, onClose, modalRef, animationPercentage, bodyScrollFromTop },
  headerRef
) {
  const [initialTouchPoint, setInitialTouchPoint] = useState(null);
  const initialDialogY = modalRef.current?.getBoundingClientRect().y;
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    setImageHeight(headerRef.current.offsetHeight);
  }, [headerRef]);

  const handleTouchMove = (e) => {
    const dialogPositionY = modalRef.current.getBoundingClientRect().y;

    if (dialogPositionY < initialDialogY) {
      modalRef.current.style.transform = `translateY(0px)`;
    } else {
      const pixelsToMoveY = e.changedTouches[0].clientY - initialTouchPoint;
      modalRef.current.style.transform = `translateY(${pixelsToMoveY}px)`;
    }
  };

  const handleTouchEnd = (e) => {
    const pixelsMoved = e.changedTouches[0].clientY - initialTouchPoint;

    if (pixelsMoved > 400) {
      onClose();
      modalRef.current.style.transform = "";
    } else {
      modalRef.current.style.transform = `translateY(0px)`;
      // modalRef.current.style.transition = `transform 200ms ease-in-out, overlay 200ms ease-in-out allow-discrete, display 200ms ease-in-out allow-discrete;`;
    }
  };

  return (
    <div
      ref={headerRef}
      style={
        bodyScrollFromTop > 0
          ? {
              height: `${imageHeight - bodyScrollFromTop}px`,
              boxShadow: `0px 0px ${animationPercentage / 5}px`,
            }
          : {}
      }
      className={styles.menuItemHeader}
      onTouchStart={(e) => setInitialTouchPoint(e.changedTouches[0].clientY)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        style={{
          height: imageHeight,
          opacity: `${100 - animationPercentage}%`,
        }}
        src={item.image}
        alt=""
      />
      <div
        style={{
          opacity:
            animationPercentage < 50
              ? "0%"
              : `${(animationPercentage - 50) * 2}%`,
        }}
        className={`${styles.menuItemHeaderTitle} textStyle1Lines`}
      >
        {item.title}
      </div>
      <button
        onClick={onClose}
        type="button"
        className={styles.menuItemCloseButton}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1rem"
          height="1rem"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z" />
        </svg>
      </button>
    </div>
  );
});

ItemDialogHeader.propTypes = {
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  modalRef: PropTypes.object.isRequired,
  animationPercentage: PropTypes.number.isRequired,
  bodyScrollFromTop: PropTypes.number.isRequired,
};

export default ItemDialogHeader;
