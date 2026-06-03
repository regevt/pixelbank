import { JSONFile } from 'lowdb/node'
import { join } from 'path'
import { LOG_DIR } from '../consts'
import { LogEntry } from '../types'
import { Low } from 'lowdb'

type Data = {
  logs: LogEntry[]
}

const appLogDbAdapter = new JSONFile<Data>(join(LOG_DIR, 'app_log.json'))
export const appLogDb = new Low<Data>(appLogDbAdapter, { logs: [] })

const userLogDbAdapter = new JSONFile<Data>(join(LOG_DIR, 'users_log.json'))
export const userLogDb = new Low<Data>(userLogDbAdapter, { logs: [] })

export async function getAllLogsForDB(db: Low<Data>): Promise<LogEntry[]> {
  try {
    await db.read()
    return db.data.logs
  } catch (error) {
    throw `Database operation failed: ${error}`
  }
}

export async function writeToLog(db: Low<Data>, entry: LogEntry): Promise<void> {
  try {
    await db.read()
    db?.data.logs.push(entry)
    await db?.write()
  } catch (error) {
    throw `Database operation failed: ${error}`
  }
}

export async function getUserLogs(user: string): Promise<LogEntry[]> {
  try {
    await userLogDb.read()
    return userLogDb.data.logs.filter((log) => log.user === user)
  } catch (error) {
    throw `Database operation failed: ${error}`
  }
}
