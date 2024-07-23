function handleBodyOnModalOpen(modalIsOpen) {
  if (modalIsOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

export { handleBodyOnModalOpen };
