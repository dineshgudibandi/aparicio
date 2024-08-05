const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aparicioleander951@gmail.com',
    pass: '@itBTiL22'
  }
});

// API route to handle order submissions
app.post('/submit_order', (req, res) => {
  const { name, phone, order, total } = req.body;

  const orderDetails = order.map(item => {
    if (item.selectedOption) {
      return `${item.name} (${item.selectedOption.type}) - ${item.selectedOption.price}`;
    } else {
      return `${item.name} - ${item.price}`;
    }
  }).join('\n');

  const mailOptions = {
    from: 'aparicioleander951@gmail.com',
    to: 'dineshreddyy@gmail.com', // Change to your restaurant's staff email
    subject: 'New Order Received',
    text: `Name: ${name}\nPhone: ${phone}\nOrder:\n${orderDetails}\n\nTotal: $${total}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'An error occurred. Please try again.' });
    } else {
      return res.status(200).json({ message: 'Order submitted successfully!' });
    }
  });
});

// Catch all handler for any requests that don't match the above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
