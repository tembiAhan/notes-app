const app = require('./src/app');

const port = 5000;
const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

app.listen(port, () => {
  console.log(`Server berjalan di http://${host}:${port}`);
});
