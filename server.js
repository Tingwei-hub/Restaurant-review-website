const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');

const MySQLStore = require('express-mysql-session')(session);

const app = express();
const port = 3000;
const startPage = "homepage.html";

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'restaurant_review'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


const sessionStore = new MySQLStore({}, db);

app.use(session({
  store: sessionStore,
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: false 
  }
}));

// root directory displays homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', startPage));
  console.log('Paged start username:', req.session.username);
  console.log('Page start login:', req.session.isLoggedIn);
});

app.get('/isLoggedIn', (req, res) => {
  res.json({
    isLoggedIn: req.session.isLoggedIn === true,
    username: req.session.username || ''
  });
});

app.get('/data', async (req, res) => {
  const sql = "SELECT * FROM RESTAURANT_REVIEW.RESTAURANT";

  const user = req.session.username;
  db.query(sql, function (error, result) {
    if (error) {
      return res.status(500).json({ error: error.message });
    } else {
      //return result as json
      res.json({ user, data: result });
    }
  });
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// from form
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // if password is correct
    if (results.length > 0) {
      req.session.isLoggedIn = true;
      req.session.username = results[0].username;
      console.log('Login username:', req.session.username);
      console.log('Log in:', req.session.isLoggedIn);
      res.redirect('/');
    } else {
      return res.status(400).json({ error: 'Wrong Email/Password' });
    }
    // console.log(results);
  });
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  const checkEmailSql = 'SELECT * FROM user WHERE email = ?';
  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    else if (results.length > 0) {
      return res.status(400).json({ error: 'Email already in use' });
    } else {
      const insertUserSql = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
      db.query(insertUserSql, [name, email, password], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        req.session.isLoggedIn = true;
        req.session.username = name;
        res.status(200).json({ message: 'Registration successful' });
      });
    }
  });
});

app.get('/restaurant', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'restaurant.html'));
});

app.get('/restaurantData/:id', async (req, res) => {
  const { id } = req.params;
  const restaurantQuery = 'SELECT * FROM restaurant WHERE _id = ?';
  const reviewsQuery = 'SELECT * FROM review WHERE restaurantId = ?';
  const username = req.session.username;

  try {
    // Execute both queries concurrently
    const [restaurantResults, reviewsResults] = await Promise.all([
      new Promise((resolve, reject) => {
        db.query(restaurantQuery, [id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      }),
      new Promise((resolve, reject) => {
        db.query(reviewsQuery, [id], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      })
    ]);

    // Combine the results and send the response
    res.json({
      restaurant: restaurantResults,
      reviews: reviewsResults,
      username
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


app.get('/review', (req, res) => {
  console.log(req.session.isLoggedIn);
  if (req.session.isLoggedIn) {
    res.sendFile(path.join(__dirname, 'public', 'review.html'));
  } else {
    return res.status(400).json({ error: 'You must be logged in to write a review' });
  }
});

app.post('/reviewData', (req, res) => {
  const { date, review, ratingInt, restaurantId } = req.body;
  const userName = req.session.username;
  console.log(userName);
  if (!req.session.isLoggedIn) {
    return res.status(401).json({ error: 'User must be logged in' });
  }

  const sql = 'INSERT INTO review (restaurantId, username, review, rating, datePosted)  VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [restaurantId, userName, review, ratingInt, date], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: 'Registration successful' });
    }
  });
});

app.get('/getReview', (req, res) => {
  const { restaurantId } = req.params;
  console.log(restaurantId);
});

app.get('/deleteReview', (req, res) => {
  const reviewId = req.query.reviewId;
  console.log(reviewId);
  const sql = 'DELETE FROM review WHERE _id = ?'
  db.query(sql, [reviewId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ message: 'Great success' });
    }
  })
});

app.get('/goEditReview', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'editReview.html'));
});

app.post('/editReview', (req, res) => {
  const { date, review, ratingInt, reviewId } = req.body;
  const sql = 'UPDATE review SET review = ?, rating = ?, datePosted = ? WHERE _id = ?';
  db.query(sql, [review, ratingInt, date, reviewId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      return res.status(200).json({ message: 'Great success' });
    }
  });
});

app.get('/search', (req, res) => {
  const query = req.query.q;
  const sql = `SELECT * FROM restaurant WHERE name LIKE ?`;
  db.query(sql, [`%${query}%`], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log('Listening at port 3000');
})

