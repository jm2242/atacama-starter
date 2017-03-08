//@flow
import express from 'express'
import http from 'http'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import foodRoute from './routes/food'
import books from './routes/books'
import authors from './routes/authors'

const app = express();

if(process.NODE_ENV != "production") {
    app.set('json spaces', 2);
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use('/api/food', foodRoute);
app.use('/api/books', books);
app.use('/api/authors', authors);

app.use((err, req: express.Request, res: express.Response, next) => {
    if (res.headersSent) {
        return next(err)
    }

    console.log(err);

    res.status(err.status || 500).json(err);
});

const port = process.env.PORT || 3001;
const server = http.createServer(app);

server.listen(port);
server.on('error', (e: Error) => {
    console.log(`Error starting server: ${e.message}`)
});
server.on('listening', () => {
    console.log(`Atacama started on port ${port}`)
});
