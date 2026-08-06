import http from 'http';

http.get('http://localhost:3000/products/surti_undhiyu_grey.png', (res) => {
  console.log('Status code:', res.statusCode);
  console.log('Headers:', res.headers);
  process.exit(0);
}).on('error', (err) => {
  console.error('Error connecting to server:', err.message);
  process.exit(1);
});
