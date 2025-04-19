const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const enquirySchema = new mongoose.Schema(
  {
    enquiryNoRaw: {
      type: Number,
      unique: true,
    },
    enquiryNo: {
      type: String,
      unique: true,
    },
    enquiryType: {
      type: String,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
     
    },
    email: {
      type: String,
      required: true,
    },
    courseInterest: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    enquiryDetail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
      required: true,
    },
    date: {
      type: Date,
   
      required: true,
    },
  },
  { timestamps: true }
);

// Auto-increment the raw number
enquirySchema.plugin(AutoIncrement, { inc_field: "enquiryNoRaw" });

// Format enquiryNo like "ENQ001"
enquirySchema.pre("save", function (next) {
  if (!this.enquiryNo && this.enquiryNoRaw) {
    this.enquiryNo = `ENQ${String(this.enquiryNoRaw).padStart(3, "0")}`;
  }
  next();
});

module.exports = mongoose.model("Enquiry", enquirySchema);
