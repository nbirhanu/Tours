const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'hello from the server side!!!',
    data: 'natours',
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
