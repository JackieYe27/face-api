import express from 'express'
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js'
import handleSignin from './controllers/signin.js'
import profile from './controllers/profile.js'
import {image, handleApiCall} from './controllers/image.js'


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'jackieye',
      password : '',
      database : 'face-rec'
    }
  });

  db.select('*').from('users').then(data => {
    //   console.log(data);
  });

const app = express();
app.use(express.json());
app.use(cors({origin: true, credentials: true}));

//signin route check email and password
app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)});

// register
app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)});

// profile
app.get('/profile/:id', (req, res) => {profile(req, res, db)});

// image entries count
app.put('/image', (req, res) => {image(req, res, db)});

//api post 
app.post('/imageurl', (req, res) => {handleApiCall(req, res)});


const port = process.env.PORT
app.listen(port || 3000, () => {
    console.log(`App is listening to port ${port}`);
})



/*
What our API will look like?

1. Sign in ruest --> POST = success/fail
2. Register --> POST = user
3. Profile --> GET = user 
4. Image --> PUT = updated count for user


*/