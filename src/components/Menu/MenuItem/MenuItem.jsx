import PropTypes from "prop-types";

const MenuItem = ({ item }) => {
  return (
    <>
      <h1>{item.title}</h1>
    </>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MenuItem;
