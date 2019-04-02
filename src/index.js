const server = require('./server')
const port = 3000 || process.env.SERVER_PORT
server.listen(port, () => {
  console.log(`Servidor HTTP iniciado na porta ${port} !`)
})
