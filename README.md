# CORS Proxy

A simple HTTP(S) CORS proxy.

# Usage

Run the server.

```bash
PORT=12345 node .
```

Make a request. The path is the URL of the proxy target.

```bash
curl localhost:12345/https://www.google.com
```
