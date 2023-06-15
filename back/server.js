import connectDatabase from './database/database.js';
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import taskModel from './models/taskSchema.js';


const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

connectDatabase()


app.get('/api/hello', async (req, res) => {
  const data = await taskModel.find().lean()
  res.json(data);
});

app.post('/api/hello', async (req, res) => {
  const { title, description, status } = req.body;

  const newTask = new taskModel({
    title,
    description,
    status,
  });

  newTask.save()
    .then((savedTask) => {
      res.json(savedTask);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error saving user' });
    });
});

app.delete('/api/hello/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    console.log(itemId)

    await taskModel.findByIdAndDelete(itemId);

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.patch('/api/hello/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const updatedFields = req.body;

    await taskModel.findByIdAndUpdate(itemId, updatedFields);

    res.sendStatus(200);
    console.log('success')
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
