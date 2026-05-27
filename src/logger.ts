import { createConsola } from 'consola'
import stripAnsi from 'strip-ansi'
import { LogEntry } from './types'
import { JSONFilePreset } from 'lowdb/node'

const appLogDb = JSONFilePreset<LogEntry[]>('./logs/app_log.json', [])

const userLogDb = JSONFilePreset<LogEntry[]>('./logs/users_log.json', [])

export const logger = createConsola({
  reporters: [
    {
      async log(logObj) {
        // keep normal consola output
        console.log(...logObj.args)

        const message = stripAnsi(logObj.args.map(String).join(' '))
        const tags = logObj.tag?.split(',').map((t) => t.trim())

        const entry: LogEntry = {
          timestamp: new Date().toISOString(),
          level: logObj.level.toString(),
          tag: tags,
          message,
        }

        let db
        if (tags.includes('users')) db = await userLogDb
        if (tags.includes('app')) db = await appLogDb

        db?.data.push(entry)

        await db?.write()
      },
    },
  ],
})
