import React, { useState } from 'react';
import axios from 'axios';

function Create({ onCreate }) {
  const [newIssue, setNewIssue] = useState({ name: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIssue({ ...newIssue, [name]: value });
  };

  const handleCreate = () => {
    axios
      .post('http://localhost:3001/issues', newIssue)
      .then((response) => {
        console.log(response)
        onCreate(response.data.newItem);
        setNewIssue({ name: '', description: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Create Issue</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newIssue.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={newIssue.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleCreate}>
          Create
        </button>
      </form>
    </div>
  );
}

export default Create;
