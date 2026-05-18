import { Argv } from 'yargs'
import { logger } from '../../logger'
import { bold, green } from 'picocolors'
import { addUser } from '../../data/usersDB'

export const command = 'adduser'
export const describe = 'Create new user account'

export function builder(yargs: Argv<unknown>): Argv {
  return yargs
}

export async function handler() {
  const username = await logger.prompt('Enter name:', {
    type: 'text',
  })

  try {
    addUser(username)
  } catch (error) {
    logger.error(error as string)
    return
  }
  logger.log(`Created user: ${green(bold(username))}!`)
}
