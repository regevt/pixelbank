import * as fs from 'fs'
import { LOG_DIR } from './consts'

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdir(LOG_DIR, { recursive: true }, (err) => {
    if (err) throw err
  })
}

export * from './commands'
