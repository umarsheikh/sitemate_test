import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditItem from './Edit'
import Create from './Create';

function Index() {
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/issues')
      .then((response) => {
        setData(response.data.issues);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleUpdate = (updatedItem) => {
    setEditItem(null);
  };

  const handleCreate = (newIssue) => {
    setData([...data, newIssue]);
  };

  return (
    <div className="App">
      <h1>My Issues</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}
            <button onClick={() => handleEdit(item)}>Edit</button>
          </li>
        ))}
      </ul>

      {editItem && (
        <EditItem item={editItem} onUpdate={handleUpdate} />
      )}
      <Create onCreate={handleCreate} />
    </div>
  );
}

export default Index
