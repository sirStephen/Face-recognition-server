import express, { request, response } from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';
import knex from 'knex';

import register from './controllers/register';
import login from './controllers/login';
import profile from './controllers/profile';
import image from './controllers/image';

const db = knex({
    client: 'pg',
        connection: {
            host : '127.0.0.1',
            user : 'postgres',
            password : 'postgres',
            database : 'facerecognitiondb'
    }
});

dotenv.config();

const app = express();

app.use(express.json({ extended: true }));
app.use(cors());

app.get('/', (request, response) => {
    response.send(database.users);
})

app.post('/login', (request, response) => {
    login.handleLogin(request, response, db, bcrypt)
})

app.post('/register', (request, response) => { 
    register.handleRegister(request, response, db, bcrypt) 
});

app.get('/profile/:id', (request, response) => {
    profile.handleProfile(request, response, db)
})

app.put('/image', (request, response) => {
    image.handleImage(request, response, db);
})

app.post('/imageurl', (request, response) => {
    image.handleApiCall(request, response);
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`app is listening on ${process.env.PORT}!`);
})