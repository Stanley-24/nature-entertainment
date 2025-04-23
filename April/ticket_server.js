const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const port = 3000;

app.use(bodyParser.json()); // For parsing application/json

// Function to verify transaction with Flutterwave
async function verifyPayment(tx_ref) {
  try {
    const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${tx_ref}/verify`, {
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}` // Use the secret key from the environment variable
      }
    });

    // Check if the payment status is successful
    if (response.data.status === 'success' && response.data.data.status === 'successful') {
      console.log('Payment verified successfully:', response.data);
      return response.data;
    } else {
      console.log('Payment verification failed:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
}

// Webhook to handle payment updates
app.post('/payment-webhook', async (req, res) => {
  const paymentData = req.body;
  const tx_ref = paymentData.tx_ref;

  // Check if payment status is "successful" from Flutterwave webhook
  if (paymentData.status === 'successful') {
    try {
      const verifiedPayment = await verifyPayment(tx_ref);

      if (verifiedPayment) {
        // Store payment details in your database or perform necessary actions
        console.log('Verified payment:', verifiedPayment);

        // Optionally, send an email confirmation or process the payment further
        // Example: sendConfirmationEmail(paymentData);

        res.status(200).send('Payment successful');
      } else {
        res.status(400).send('Payment verification failed');
      }
    } catch (error) {
      console.error('Error processing the payment:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    console.log('Payment failed or pending:', paymentData);
    res.status(400).send('Payment failed or pending');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
