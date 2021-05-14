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
    if (req.body.data.length > 0) return res.status(404).send({message : 'User with that email already exist'});
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
        if (err) return res.send('Error w/ query');
        if (queryResults.rows.length === 0) return res.send('No user found');
        const hashedPassword = queryResults.rows[0].password;
        bcrypt.compare(password, hashedPassword, (err, match) => {
            if (err) res.send('Server Error, try again');
            if (match) {
                const token = createToken(queryResults.rows[0]);
                console.log({token})
                // res.cookie("access-token", token, {
                //     maxAge: 60 * 60 * 1000,
                //     httpOnly : true
                // })
                return res.status(200).json({'accessToken' : token});
            }
            return res.status(400).send('WRONG PASSWORD');
        })
    })
}

const createExpense = (req, res) => {
    const { userID, name, cost, category } = req.body;
    console.log({userID, name, cost, category});
    pool.query(SQL `INSERT INTO expenses (user_id, name, cost, category)
                    VALUES (${userID}, ${name}, ${cost}, ${category})`, (err, queryResults) => {
                        if (err) res.sendStatus(404);
                        else res.sendStatus(200);
                    })
}

const deleteExpense = (req, res) => {
    const { id } = req.params;
    console.log(id)
    pool.query(SQL `DELETE FROM expenses 
                    WHERE id = ${id}`, (err, queryResults) => {
                        if (err) res.sendStatus(404);
                        else res.sendStatus(200);
                    })
}

const getExpenses = (req, res) => {
    const { userID } = req.body;
    pool.query(SQL `SELECT * FROM expenses 
                    WHERE user_id = ${userID}`, (err, queryResults) => {
                        if (err) res.sendStatus(404);
                        else res.status(200).send(queryResults.rows);
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
