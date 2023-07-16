import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "../styles/filter.css";

function Filter({
  showFilter,
  handleClose,
  handleShow,
  handleSubmit,
  resetFilters,
  emojiCategories,
  setEmojiCategories,
}) {
  const modifySelectedCategory = (em) => {
    setEmojiCategories((curr) => {
      return curr.map((categoryObj) => {
        if (categoryObj.category !== em.category) return categoryObj;
        else
          return {
            ...categoryObj,
            isSelected: !categoryObj.isSelected,
          };
      });
    });
  };

  return (
    <>
      <div className="filter-btn-container">
        <Button variant="warning" onClick={handleShow}>
          Filter
        </Button>
      </div>
      <Modal show={showFilter} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Emojis</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {emojiCategories.map((em, index) => (
            <div key={index} className="filter-emojis">
              <input
                type="checkbox"
                checked={em.isSelected}
                onChange={() => modifySelectedCategory(em)}
              />
              <label>{em.category}</label>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              resetFilters();
              handleClose();
            }}
          >
            Reset Filters
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Filter;
