const express = require('express');
const restaurantsRouter = require('./routers/restaurant.router');
const initializeDatabase = require('./db.connection.js');

const app = express();
app.use(express.json());
initializeDatabase(); 

app.get('/', (req, res) => {
  res.send('Express app started.')
})

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

app.use('/restaurants', restaurantsRouter);