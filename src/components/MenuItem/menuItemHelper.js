const handleContentScroll = (e, headerRef) => {
  const itemHeaderRgbColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--color-white")
    .slice(0, -1);
  // Calculate scrolled from top percentage
  const initialHeaderSize = 300;
  let maxScrollAmount = initialHeaderSize * 0.75;
  const percentageScrolled = e.target.scrollTop / maxScrollAmount;
  const totalScrollHeight =
    e.target.scrollHeight - e.target.offsetHeight - e.target.scrollTop;

  if (totalScrollHeight > 0) {
    const newHeaderSize = Math.round(
      initialHeaderSize - initialHeaderSize * percentageScrolled
    );

    // Handle size and color/overlay
    headerRef.current.style.maxHeight = `${newHeaderSize}px`;
    headerRef.current.style.backgroundColor = `${itemHeaderRgbColor}, ${percentageScrolled})`;

    // Handle boxShadow & title
    if (percentageScrolled < 0.5) {
      headerRef.current.style.boxShadow = `0px 0px 0px rgba(0, 0, 0, 0.2)`;
    } else {
      headerRef.current.style.boxShadow = `0px 0px ${
        (percentageScrolled * 100) / 10
      }px rgba(0, 0, 0, 0.2)`;
    }

    // Handle title
    if (percentageScrolled < 0.8) {
      headerRef.current.firstElementChild.style.opacity = "0";
    } else {
      headerRef.current.firstElementChild.style.opacity =
        (percentageScrolled - 0.8) * 5;
    }
  }
};

export { handleContentScroll };
