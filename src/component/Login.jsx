
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { API_URL } from '../config/api';

// const Login = () => {
//   // const router = useRouter();
  // const navigate = useNavigate();

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [message, setMessage] = useState('');
  // const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setMessage('');
  //   setLoading(true);

  //   try {
  //     const res = await axios.post(
  //       "https://aevix-chemical-mpbw.vercel.app/api/auth/login",
  //       { email, password }
  //     );

  //     console.log('Logged user:', res.data.user);
  //     setMessage(res.data.message);

  //     // ✅ Store user in localStorage
  //     localStorage.setItem('user', JSON.stringify(res.data.user));
  //     localStorage.setItem('loginEmail', email); // Store email for profile fetch

  //     // ✅ REDIRECT AFTER SUCCESS
  //     navigate('/dashboard/overview');

  //   } catch (err) {
  //     setMessage(err.response?.data?.message || 'Something went wrong');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow-md w-80"
//       >
//         <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full border px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full border px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 rounded text-white ${
//             loading
//               ? 'bg-blue-400 cursor-not-allowed'
//               : 'bg-blue-600 hover:bg-blue-700'
//           }`}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>

//         {message && (
//           <p className="text-center text-sm mt-3 text-red-500">
//             {message}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default Login;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpRequired, setOtpRequired] = useState(false);
const [otp, setOtp] = useState("");
const [userId, setUserId] = useState(null);


  // 🔐 SIGN IN FUNCTION
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setMessage("");
  //   setLoading(true);

  //   try {
  //     const res = await axios.post(
  //       "https://aevix-chemical-mpbw.vercel.app/api/auth/login",
  //       { email, password }
  //     );

  //     // Normalize email and save user
  //     const normalizedEmail = (email || '').trim().toLowerCase();
  //     const userObj = { ...(res.data.user || {}), email: normalizedEmail };
  //     localStorage.setItem("user", JSON.stringify(userObj));
  //     localStorage.setItem("loginEmail", normalizedEmail);

  //     // Debug: log the login response object
  //     console.log('LOGIN_RESPONSE:', res.data);
  //     localStorage.setItem("user", JSON.stringify(res.data.user));


  //     // Dispatch a login event so other components (eg. Sidebar) can update immediately
  //     try {
  //       window.dispatchEvent(new CustomEvent('user:login', { detail: userObj }));
  //     } catch (e) {
  //       // ignore if CustomEvent unsupported
  //     }

  //     // ✅ Navigate after login
  //     navigate("/dashboard/overview");
  //     console.log(res.data.user);
  //   } catch (err) {
  //     setMessage(err.response?.data?.message || "Login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://aevix-chemical-mpbw.vercel.app/api/auth/login",
        { email, password }
      );

      // OTP sent — store email and navigate to verification page
      if (res.data && res.data.email) {
        const normalized = (email || '').trim().toLowerCase();
        localStorage.setItem('loginEmail', normalized);
        setMessage('OTP sent to your email');
        navigate('/verify-otp');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     2️⃣ OTP VERIFY
  ========================== */
  const verifyOtp = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://aevix-chemical-mpbw.vercel.app/api/auth/verify-otp",
        { userId, otp }
      );

      // Normalize & store user
      const userObj = {
        ...res.data.user,
        email: res.data.user.email.toLowerCase(),
      };

      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("loginEmail", userObj.email);

      // 🔔 Notify sidebar/header
      window.dispatchEvent(
        new CustomEvent("user:login", { detail: userObj })
      );

      navigate("/dashboard/overview");
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SECTION */}
        <div className="relative bg-gradient-to-br from-blue-700 to-blue-500 text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-rose-500 bg-clip-text text-transparent">WELCOME </h2>
          <h3 className="bg-gradient-to-r from-rose-400 to-black bg-clip-text text-transparent font-semibold text-2xl mb-4">to Aevix Chemical</h3>
          <p className="text-sm opacity-90">
            Your headline name <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400 rounded-full opacity-40"></div>
          <div className="absolute bottom-10 left-20 w-24 h-24 bg-blue-300 rounded-full opacity-40"></div>
        </div>

        {/* RIGHT SECTION */}
        <div className="p-10 flex flex-col justify-center">
          <h3 className="text-2xl font-semibold mb-6">Sign in</h3>

          <form className="space-y-4" onSubmit={otpRequired ? verifyOtp : handleSubmit}>
            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password or OTP (conditional) */}
            {!otpRequired ? (
              <>
                <div className="relative">
                  <label className="text-sm text-gray-600">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer right-3 top-9 text-gray-500"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </p>
                </div>

                {/* Sign in button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2 rounded-lg font-medium transition text-white
                    ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                  `}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </>
            ) : (
              <>
                <div>
                  <label className="text-sm text-gray-600">OTP</label>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    autoFocus
                  />
                  <p className="text-xs text-gray-500 mt-1">OTP sent to <strong>{email}</strong>. Check your email.</p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 py-2 rounded-lg font-medium text-white transition ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>

                  <button
                    type="button"
                    onClick={async () => {
                      // Resend OTP
                      setMessage('');
                      setLoading(true);
                      try {
                        const res = await axios.post('https://aevix-chemical-mpbw.vercel.app/api/auth/login', { email, password });
                        if (res.data.otpRequired) {
                          setUserId(res.data.userId);
                          setMessage('OTP resent');
                        }
                      } catch (err) {
                        setMessage(err.response?.data?.message || 'Failed to resend OTP');
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="flex-none py-2 px-3 rounded-lg border bg-white hover:bg-gray-50"
                  >
                    Resend
                  </button>
                </div>
              </>
            )}

            {/* Error */}
            {message && (
              <p className="text-center text-sm text-red-500">{message}</p>
            )}

          </form>

          <p className="text-xs text-gray-400 mt-6 text-center">
            © 2026 Aevix Chemical
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;

