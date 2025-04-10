const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const enquirySchema = new mongoose.Schema({
    enqtype: {
        type: String,
        enum: ["direct", "telephonic"],
        required: true
    },
    enq_no: {
        type: Number
    },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    address: { type: String, required: true },
    user: { type: String, required: true },
    enqdate: {
        type: String,
        default: () => {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            return `${dd}-${mm}-${yyyy}`;
        },
        required: true
    },
    enqdetail: { type: String, required: true }
}, { timestamps: true });

enquirySchema.plugin(AutoIncrement, { inc_field: 'enq_no' });

module.exports = mongoose.model("Enquiry", enquirySchema);
