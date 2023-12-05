import path from 'path'
import winstom, { format } from 'winston'

const logger = winstom.createLogger({
  format: format.combine(
    format.timestamp({
      format: 'DD-MM-YYYY hh:mm:ss A'
    }),
    format.prettyPrint(),
    format.printf((log) => `[${log.timestamp}] ${log.level}: ${log.message}`)
  ),
  transports: [
    new winstom.transports.File({
      filename: path.join(__dirname, './reports/output_app.log')
    })
  ]
})

export default logger
