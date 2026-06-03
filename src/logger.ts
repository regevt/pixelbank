import { createConsola } from 'consola'
import stripAnsi from 'strip-ansi'
import { LogEntry, LogObjectEntry } from './types'
import { appLogDb, userLogDb, writeToLog } from './data/logsDB'

export const logger = createConsola({
  reporters: [
    {
      async log(logObj) {
        const logItem = logObj as LogObjectEntry

        console.log(logObj.args[0])
        const message = stripAnsi(logObj.args[0] || '')
        const tags = logItem.args[1]?.tags
        const user = logItem.args[1]?.user

        const entry: LogEntry = {
          timestamp: new Date().toISOString(),
          level: logObj.level.toString(),
          tag: tags,
          user,
          message,
        }

        if (tags?.includes('users')) await writeToLog(userLogDb, entry)
        if (tags?.includes('app')) await writeToLog(appLogDb, entry)
      },
    },
  ],
})
