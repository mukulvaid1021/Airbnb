const express = require('express');

const homerouter = require('./routes/homerouter');
const contactrouter = require('./routes/contactrouter');

const app = express();

app.use(express.urlencoded());

app.use(homerouter);
app.use(contactrouter);

const PORT = 3001;
app.listen(PORT,()=>{
  console.log(`server is running on http://localhost:${PORT}`);
});