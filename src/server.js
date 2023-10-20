const jsonServer = require('json-server')

const server = jsonServer.create()


const router = jsonServer.router('db.json')

const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.rewriter({
    '/src/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server