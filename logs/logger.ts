import path from 'path'
import winstom from 'winston'

const logger = winstom.createLogger({
  transports: [
    new winstom.transports.File({
      filename: path.join(__dirname, './reports/output_app.log')
    })
  ]
})

export default logger
