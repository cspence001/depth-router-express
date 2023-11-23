const bodyParser = require("body-parser");
const express = require('express'); //Line 1
const app = express(); //Line 2
const cors= require('cors')
const port = process.env.PORT || 5000; //Line 3

const careerRoutes = require('./routes/careers');

// const data = require('./database/careers.json')

// app.use(cors())
app.use(cors({origin: true}))
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
//   });

app.use('/careers', careerRoutes);

// app.use((error, req, res, next) => {
//     const status = error.status || 500;
//     const message = error.message || 'Something went wrong.';
//     res.status(status).json({ message: message });
//   });

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6



// create a GET route
// app.get('/careers', (req, res) => { //Line 9

//     res.json(data.careers); //Line 10
// }); //Line 11

// // create a GET route


// // // create a GET route
// // app.get('/careers/:id', async (req, res) => { //Line 9
// //     const { id } = req.params;
// //     const response = await fetch(data.careers.id);
// //     const careerid = response.json()

// //     res.json(careerid); //Line 10
// // }); //Line 11
