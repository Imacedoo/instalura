export default function handler(req, res) {
  res.setPreviewData({});

  const key = 'BIRDMAN';

  if (req.query.key !== key) {
    return res.status(401).json({ message: 'Invalid key to enabled preview' });
  }

  res.writeHead(307, { location: '/' });

  return res.end();
}
