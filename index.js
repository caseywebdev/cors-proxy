const http = require('http');
const httpProxy = require('http-proxy');
const url = require('url');

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  appendPath: false
});

proxy.on('error', console.error.bind(console));

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  const reqHeaders = req.headers['access-control-request-headers'];
  if (reqHeaders) res.setHeader('Access-Control-Allow-Headers', reqHeaders);
  if (req.method === 'OPTIONS') return res.end();

  const parsed = url.parse(req.url.slice(1));
  if (!parsed.protocol || !parsed.host) return res.end();

  const target = `${parsed.protocol}//${parsed.host}`;
  req.url = parsed.path;
  proxy.web(req, res, {target});
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
