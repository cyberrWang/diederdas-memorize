const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

let words = [
  {
    id: 1,
    noun: 'Milch',
    gender: 'die'
  },
  {
    id: 2,
    noun: 'Bett',
    gender: 'das'
  },
  {
    id: 3,
    noun: 'Tisch',
    gender: 'der'
  },
  {
    id: 4,
    noun: 'Tür',
    gender: 'die'
  },
  {
    id: 5,
    noun: 'Dessert',
    gender: 'das',
  },
  {
    id: 6,
    noun: 'Kuchen',
    gender: 'der'
  },
  {
    id: 7,
    noun: 'Plattform',
    gender: 'die'
  },
  {
    id: 8,
    noun: 'Geld',
    gender: 'das'
  },
  {
    id: 9,
    noun: 'Zug',
    gender: 'der'
  },
  {
    id: 10,
    noun: 'Fahrkarte',
    gender: 'die'
  },
  {
    id: 11,
    noun: 'Ticket',
    gender: 'das'
  },
  {
    id: 12,
    noun: 'Bahnhof',
    gender: 'der'
  }
]

app.get('/', (request, response) => {
  response.send('<h1>hello world</h1>');
})

app.get('/api/words', (request, response) => {
  response.json(words);
})

app.get('/api/words/:id', (request, response) => {
  const id = Number(request.params.id);
  const word = words.find(word => word.id === id);

  if (word) {
    response.json(word);
  } else {
    response.status(404).end();
  }
})

app.put('/api/words/:id', (request, response) => {
  const id = Number(request.params.id);
  const body = request.body;
  if (!words.find(word => word.id === id)) {
    return response.status(400).json({
      error: 'word missing'
    });
  }
  words = words.map(word => word.id === id ? body : word);
  response.json(words);
})

const generateId = () => {
  const maxId = words.length > 0
    ? Math.max(...words.map(word => word.id))
    : 0

  return maxId + 1;
}

app.post('/api/words', (request, response) => {
  const body = request.body;
  if (!body.noun) {
    return response.status(400).json({
      error: 'no word'
    });
  }
  const newWord = {
    id : generateId(),
    noun: body.noun,
    gender: body.gender
  }
  words = words.concat(newWord);
  response.json(words);
})

app.delete('/api/words/:id', (request, response) => {
  const id = Number(request.params.id);
  words = words.filter(word => word.id !== id);
  response.json(words);
})

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})
