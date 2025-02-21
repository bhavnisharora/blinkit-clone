import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    adress_line: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    pincode: {
        type: String
    },
    country: {
        type: String
    },
    mobile: {
        type: Number,
        default: NULL
    },
    status: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    })

const AddressModel = mongoose.model('address', addressSchema);
export default AddressModel;