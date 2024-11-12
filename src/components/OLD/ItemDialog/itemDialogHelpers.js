function handleBodyOnModalOpen(modalIsOpen) {
  if (modalIsOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

function checkDeepEquality(obj1, obj2) {
  if (obj1 === obj2) return true;

  // Check that both are objects and not null
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  )
    return false;

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  // Check for equal number of properties
  if (keys1.length !== keys2.length) return false;

  // Check if properties are equal and then if corresponding values are equal
  for (let key of keys1) {
    if (!keys2.includes(key) || !checkDeepEquality(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

export { handleBodyOnModalOpen, checkDeepEquality };
