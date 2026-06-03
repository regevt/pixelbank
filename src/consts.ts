import { homedir } from 'os'
import { join } from 'path'

export const LOG_DIR = join(homedir(), 'logs')
