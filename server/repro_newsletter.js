const http = require('http');

const data = JSON.stringify({
  email: 'test_repro@example.com'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/newsletter/subscribe',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

console.log('Testing Newsletter Subscription Endpoint...');

const req = http.request(options, (res) => {
  let responseData = '';

  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Response Body:', responseData);
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
  if (error.code === 'ECONNREFUSED') {
    console.error('Connection refused. Is the server running on port 5000?');
  }
});

req.write(data);
req.end();
