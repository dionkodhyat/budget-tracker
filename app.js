const express = require('express');
const cookieParser = require('cookie-parser') //parse cookie
const cors = require('cors')
const { validateToken } = require('./db/jwt');
const db = require('./db/queries')

const app = express();
const PORT = process.env.PORT || 3001

/* Middleware */
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())


/* Routes */
app.get('/', (req, res) => {
  res.send('<h1>HELLO WORLD</h1>')
})



app.post('/expense', validateToken, db.createExpense);
app.post('/register', db.checkUser, db.registerUser);
app.post('/login', db.login);
app.get('/expense', validateToken, db.getExpenses);
app.delete('/expense/:id', validateToken, db.deleteExpense)



app.listen(3001, (req, res) => {
  console.log('LISTENING TO PORT 3001')
})