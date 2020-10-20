const express = require('express')
require('dotenv').config();
const logger = require('morgan');
const app = express()
const PORT = process.env.PORT;

// Add the middleware code needed to accept incoming data and add it to req.body
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
	res.json({
		status: 200,
		msg: 'you have hit the default route...nothing to see here',
	});
});

const authorsController = require('./controllers/authorRoutes');
app.use('/authors', authorsController);

const cookbooksController = require('./controllers/cookbookRoutes');
app.use('/cookbooks', cookbooksController);

const cookbookRouter = require('./controllers/cookbookRoutes')
app.use('/api/cookbooks/', cookbookRouter)

const authorRouter = require('./controllers/authorRoutes')
app.use('/api/authors/', authorRouter)

app.listen(PORT, () => {
	console.log(`listening in on port: ${PORT}`);
});
