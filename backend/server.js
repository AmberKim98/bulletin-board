const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'PATCH') {
        req.body.updated_at = new Date();
    }
    if(req.method === 'POST') {
        req.body.created_at = new Date();
        req.body.updated_at = new Date();
        console.log(req.body.created_at);
    }
    // Continue to JSON Server router
    next()
})

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running')
})