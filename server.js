const app = require('./src/app');

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, () => {
  console.log(`Server berjalan di http://${host}:${port}`);
});
