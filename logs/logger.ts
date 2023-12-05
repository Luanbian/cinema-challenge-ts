import path from 'path'
import winstom, { format } from 'winston'
import { format as form } from 'date-fns'

const day = form(new Date(), 'dd_MM_yyyy')

const logger = winstom.createLogger({
  format: format.combine(
    format.timestamp({
      format: 'DD-MM-YYYY hh:mm:ss A'
    }),
    format.prettyPrint(),
    format.printf((log) => `[${log.timestamp}] ${log.level}: ${log.message}, ${log.label}, ${log.error}`)
  ),
  transports: [
    new winstom.transports.File({
      filename: path.join(__dirname, `./reports/output-${day}.log`)
    })
  ]
})

export default logger
