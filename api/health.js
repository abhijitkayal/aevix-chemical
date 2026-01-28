export default function handler(req, res) {
  // Simple smoke-check endpoint to confirm /api routing on Vercel
  res.status(200).json({ ok: true, message: 'API is reachable', path: req.url });
}
