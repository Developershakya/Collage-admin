const express = require("express");
const Stripe = require("stripe");
const router = express.Router();
const stripe = Stripe("sk_test_51RJWDYSGzMNdL60zhKe8mfn8SiKy7dXHko9G0rwUnP9JTMElbPJaTanAYbJTEtkKV1PlfYcpl0XBKDkiJ0AM8EKZ00h7kQe7wQ"); // your secret key

const Student = require("../models/stdSchema");
const Course = require("../models/courseSchema"); // assuming you have a Course model

router.post("/create-checkout-session", async (req, res) => {
  const { enrollmentNo } = req.body;
  console.log("Enrollment No:", enrollmentNo);

  try {
    // Step 1: Find student and populate course
    const student = await Student.findOne({ enrollmentNo }).populate("course");
console.log(`this is student id : ${student._id}`  );
const studentId = student._id; // Get the student ID
if (!student) {
  console.error("❌ Student not found for enrollmentNo:", enrollmentNo);
  return res.status(404).json({ error: "Student not found" });
}
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    
    if (!student.course) {
      return res.status(404).json({ error: "Course not found for the student" });
    }
    const courseName = student.course.courseName;
    const courseFee = student.course.courseFee;

    if (!courseFee || isNaN(courseFee)) {
      return res.status(400).json({ error: "Invalid course fee" });
    }

    const feeInPaise = courseFee * 100;
    console.log("Course:", courseName, "Fee:", courseFee);

    // Step 2: Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${courseName} Fee`,
            },
            unit_amount: feeInPaise,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_creation: "always",
      shipping_address_collection: {
        allowed_countries: ["IN"],
      },
      customer_email: student.email || "default@example.com", // replace with actual email if available
      billing_address_collection: "required",
      success_url: `http://localhost:5173/payment-success?studentId=${studentId}`,
      cancel_url: "http://localhost:5173/payment-cancel",
    });
console.log({id: session.id} );
    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Payment session creation failed" });
  }
});

module.exports = router;
