import {Pool} from 'pg';
import axios from 'axios';
import dotenv from 'dotenv';
import express, {Express, Request, Response} from "express";

const app = express();
const PORTNUMBER = 3000;

app.use(express.json());

// SPECIFY PATH FOR THE dotenv FILE!!!
dotenv.config({path: '../.env'});

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,  
});

// endpoint to get users
app.get('/users', async (_req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM users');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Could not fetch all users:', error);
        res.status(500).json({message: 'Could not fetch users', error});
    }
});


app.post('/users', async(_req: Request, res: Response) => {
    
    // extract the username and email from the body
    const {username, email} = _req.body;
    
    try{
        const result = await pool.query('INSERT INTO users (username, email) VALUES ($1, $2)', [username, email] );
        res.status(201).json({
            message: 'User added!',
            user: result.rows[0],
        });
    } catch(error) {
        console.error('could not fetch all users: ', error);
        res.status(500).json({message: 'Could not submit user info', error});
    }
});

// Delete
app.delete('/users/:id', async(_req: Request, res: Response) => {
    
    // Use params when you have info from the route to use for an
    // SQL query
    const { id } = _req.params;

    try {
        const dQuery = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    } catch (error) {
        console.error('Not able to delete the user: ', error);
    }

});

app.listen(PORTNUMBER, async () => {
    console.log("PORT IS RUNNING ON:", PORTNUMBER);
})