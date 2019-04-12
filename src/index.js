const server = require('./server')
const port = process.env.SERVER_PORT || 3000
server.listen(port, () => {
  console.log(`Servidor HTTP iniciado na porta ${port} !`)
})
