const express = require('express');
const router = express.Router();

router.post('/create-order', (req, res) => {
    // Mock Razorpay Order Creation
    const { amount } = req.body;
    res.json({
        id: `order_mock_${Date.now()}`,
        currency: 'INR',
        amount: amount * 100 // Razorpay expects amount in paise
    });
});

router.post('/verify-payment', (req, res) => {
    // Mock Payment Verification
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Always success for dev
    res.json({
        message: 'Payment Verified',
        success: true,
        paymentId: razorpay_payment_id || `pay_mock_${Date.now()}`
    });
});

module.exports = router;
