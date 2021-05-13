const pool = require("./config");
const SQL = require('sql-template-strings');
const bcrypt = require('bcrypt');
const { createToken } = require('./jwt');


const saltRounds =  10;

const checkUser = (req, res, next) => {
    const { email } = req.body;
    pool.query(SQL `SELECT * FROM users 
                    WHERE email = ${ email }`, (err, queryResults) => {
                        if (err) res.send('Error w/ query');
                        req.body.data = queryResults.rows;
                        next()

    })
}

const registerUser = (req, res) => {
    if (req.body.data !== null) return res.send('User with that email already exist');
    const { name, email, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) res.send('Error w/ password hash function');
        pool.query(SQL `INSERT INTO users (name, email, password)
                        VALUES (${name}, ${email}, ${hashedPassword})`, (err, queryResult) => {
            if (err) res.status(404).send(err);
            else res.sendStatus(200);
        })
    })
}



const login = (req, res) => {
    const { email, password } = req.body;
    pool.query(SQL `SELECT * FROM users WHERE email = ${email}`, (err, queryResults) => {
        if (err) res.send('Error w/ query');
        if (queryResults.rows.length > 0) {
            const hashedPassword = queryResults.rows[0].password;
            bcrypt.compare(password, hashedPassword, (err, match) => {
                if (err) res.send('Server Error, try again');
                if (match) {
                    const token = createToken(queryResults.rows[0]);
                    res.cookie("access-token", token, {
                        maxAge: 60 * 60,
                        httpOnly : true
                    })
                    res.json()
                }
                else res.send('WRONG PASSWORD');
            })
        }
        else res.send('No user found')
    })
}

const createExpense = (req, res) => {
    const { userID, name, cost, category } = req.body;
    pool.query(SQL `INSERT INTO expenses (user_id, name, cost, category)
                    VALUES (${userID}, ${name}, ${cost}, ${category})`, (err, queryResults) => {
                        if (err) res.sendStatus(404);
                        else res.sendStatus(200);
                    })
}

const deleteExpense = (req, res) => {
    const { userID, id } = req.body;
    pool.query(SQL `DELETE FROM expenses 
                    WHERE user_id = ${userID} AND id = ${id}`, (err, queryResults) => {
                        if (err) res.sendStatus(404);
                        else res.sendStatus(200);
                    })
}

const getExpenses = (req, res) => {
    const { userID } = req.body;
    console.log(`User id : ${userID}`)
    pool.query(SQL `SELECT * FROM expenses 
                    WHERE user_id = ${userID}`, (err, queryResults) => {
                        console.log(queryResults.rows)
                        if (err) res.sendStatus(404);
                        else res.status(200).send(queryResults);
                    })
}

module.exports = {
    registerUser,
    createExpense,
    login,
    deleteExpense,
    getExpenses,
    checkUser,
};

