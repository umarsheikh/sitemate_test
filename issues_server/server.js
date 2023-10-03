const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

let issues = [
  { id: 1, name: 'Item 1', description: 'Description for Item 1' },
  { id: 2, name: 'Item 2', description: 'Description for Item 2' }
]

// Create (POST)
app.post('/issues', (req, res) => {
  const newItem = req.body;
  const itemId = issues.length + 1;
  newItem['id'] = itemId
  issues.push(newItem);
  console.log('Created:', newItem);
  res.json({ message: 'Item created successfully', newItem });
});

// Read (GET)
app.get('/issues', (req, res) => {
  res.json({ issues });
});

// Update (PUT)
app.put('/issues/:id', (req, res) => {
  const issueId = parseInt(req.params.id);
  const updatedIssue = req.body;

  const index = issues.findIndex((issue) => issue.id === issueId);

  if (index !== -1) {
    issues[index] = updatedIssue;
    console.log('Updated:', updatedIssue);
    res.json({ message: 'Issue updated successfully', updatedIssue });
  } else {
    res.status(404).json({ message: 'Issue not found' });
  }
});

// Delete (DELETE)
app.delete('/issues/:id', (req, res) => {
  const issueId = parseInt(req.params.id);

  const index = issues.findIndex((issue) => issue.id === issueId);

  if (index !== -1) {
    const deletedIssue = issues.splice(index, 1)[0];
    console.log('Deleted:', deletedIssue);
    res.json({ message: 'Issue deleted successfully', deletedIssue });
  } else {
    res.status(404).json({ message: 'Issue not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
