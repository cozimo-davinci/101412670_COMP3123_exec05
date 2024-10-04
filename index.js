const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const user = require('./user.json');

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});


app.use(router);
/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  const profile = user;
  res.send(profile);
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === user.username && password === user.password) {
    res.send({
      status: true,
      message: "User Is valid"
    })
  };

  if (username !== 'bret') {
    res.send({
      status: false,
      message: "Username is not valid"
    })
  };

  if (password !== "bret@123") {
    res.send({
      status: false,
      message: "Password is not valid"
    })
  };
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req, res) => {
  const username = req.params.username;

  res.send(`<b>${username} successfully logout.<b>`);

});

router.get('/error', (req, res) => {
  res.send(errorMiddleware);
  // console.log(errorMiddleware);
})

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
const errorMiddleware = app.use((err, req, res, next) => {
  console.error(err.stack);
  const errorObject = {
    status: 500,
    message: "Server Error",
    err: err.message

  }
  res.status(500).send(errorObject);
  next();
});

app.use('/', router);

app.listen(process.env.port || 8088);

console.log('Web Server is listening at port ' + (process.env.port || 8088) + "at http://localhost:8088");