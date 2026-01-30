import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Read email stored during login
    const stored = localStorage.getItem('loginEmail');
    if (!stored) {
      // No email to verify -> go back to login
      navigate('/');
      return;
    }
    setEmail(stored);
  }, [navigate]);

  const verifyOtp = async (e) => {
    e?.preventDefault?.();
    setMessage('');
    setLoading(true);
    try {
      const res = await axios.post('https://aevix-chemical-mpbw.vercel.app/api/auth/verify-otp', { email, otp });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.removeItem('loginEmail');
      setMessage('Verified! Redirecting...');
      // Dispatch login event
      try { window.dispatchEvent(new CustomEvent('user:login', { detail: res.data.user })); } catch(e) {}
      navigate('/dashboard/overview');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setMessage('');
    setLoading(true);
    try {
      await axios.post('https://aevix-chemical-mpbw.vercel.app/api/auth/resend-otp', { email });
      setMessage('OTP resent to your email');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={verifyOtp} className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Verify OTP</h2>
        <p className="text-sm text-gray-600 mb-3">Enter the 6-digit code sent to <strong>{email}</strong></p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border px-3 py-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        <button
          type="button"
          onClick={resendOtp}
          className="w-full mt-3 py-2 rounded border bg-white hover:bg-gray-50"
        >
          Resend OTP
        </button>

        {message && (
          <p className="text-center text-sm mt-3 text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
}
