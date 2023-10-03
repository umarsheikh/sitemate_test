import React, { useState } from 'react';
import axios from 'axios';

function Edit({ item, onUpdate }) {
  const [updatedItem, setUpdatedItem] = useState(item);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem({ ...updatedItem, [name]: value });
  };

  const handleUpdate = () => {
    axios
      .put(`http://localhost:3001/issues/${item.id}`, updatedItem) // Replace with your API endpoint
      .then((response) => {
        onUpdate(response.data.updatedItem);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Edit Item</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedItem.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={updatedItem.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
}

export default Edit
