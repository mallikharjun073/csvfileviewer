import express from 'express';
import csvRoutes from './routes/csv.routes.js';
import bodyParser from "body-parser"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', (req, res) =>{
  res.render('index')
})
app.use('/csv', csvRoutes);

// Other middleware and configurations...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});