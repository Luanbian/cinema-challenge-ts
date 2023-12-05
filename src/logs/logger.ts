import path from 'path'
import winston, { format } from 'winston'
import { format as form } from 'date-fns'

const day = form(new Date(), 'dd_MM_yyyy')

const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({
      format: 'DD-MM-YYYY hh:mm:ss A'
    }),
    format.prettyPrint(),
    format.printf((log) => {
      const label = log.label !== undefined ? `, ${JSON.stringify(log.label)}` : ''
      const error = log.error !== undefined ? `, ${log.error}` : ''

      return `[${log.timestamp}] ${log.level}: ${log.message} ${label} ${error}`
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, `./reports/output-${day}.log`)
    })
  ]
})

export default logger
