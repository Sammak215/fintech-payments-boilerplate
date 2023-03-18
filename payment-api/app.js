const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// const Router = require("./routes");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

mongoose.connect(
  'mongodb+srv://sammak:sammak@cluster0.w0qxr.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

const paymentRoutes = require('./src/routes/populStayTransactionRoutes');

app.use(paymentRoutes);

app.listen(port, () => {
  console.log('Server is running at port 3001');
});
