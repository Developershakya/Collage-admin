const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
STRIPE_SECRET_KEY="sk_test_51RJWDYSGzMNdL60zhKe8mfn8SiKy7dXHko9G0rwUnP9JTMElbPJaTanAYbJTEtkKV1PlfYcpl0XBKDkiJ0AM8EKZ00h7kQe7wQ"
const stripe = Stripe(STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { studentId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Student Registration Fee",
            },
            unit_amount: 50000, // ₹500.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/payment-success?studentId=${studentId}`,
      cancel_url: "http://localhost:5173/payment-cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Payment session failed" });
  }
});

module.exports = router;
