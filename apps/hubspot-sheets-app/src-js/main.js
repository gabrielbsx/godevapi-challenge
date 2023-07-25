/* eslint-disable @typescript-eslint/no-var-requires */
const { Server } = require('./main/server')

const server = new Server()
server.bootstrap()
server.start()
//   const sheetId = '1FVlfOM3pAxCuqzuPep8_vFidQ8FSH2jODecAD7ieNXc'
