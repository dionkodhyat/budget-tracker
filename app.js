const express = require('express');
const cookieParser = require('cookie-parser') //parse cookie
const cors = require('cors')
const { validateToken } = require('./db/jwt');
const db = require('./db/queries')

const app = express();

/* Middleware */
// app.use(cors( {
//   origin: ["http://localhost:3000"],
//   methods : ['GET', 'POST'],
//   credentials: true // allow the cookie to be enabled
// }));
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
app.delete('/expense', validateToken, db.deleteExpense)



app.listen(3001, (req, res) => {
  console.log('LISTENING TO PORT 3000')
})