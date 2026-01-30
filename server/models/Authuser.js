// // const mongoose = require('mongoose');
// import mongoose from 'mongoose';
// import { type } from 'os';

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role:{
//     type: String,
//     required: true
//   }
// });

// // module.exports = mongoose.model('User', userSchema);
// export default mongoose.model('AuthUser', userSchema);



// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import { type } from 'os';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role:{
    type: String,
    required: true
  },
  // OTP fields for login flow
  otp: { type: String },
  otpExpiry: { type: Date }
});

// module.exports = mongoose.model('User', userSchema);
export default mongoose.model('AuthUser', userSchema);
