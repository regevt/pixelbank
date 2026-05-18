import { Argv } from 'yargs'
import { logger } from '../../logger'
import { bold, green } from 'picocolors'
import { deleteUser } from '../../data/usersDB'

export const command = 'deleteuser'
export const describe = 'Delete new user account'

export function builder(yargs: Argv<unknown>): Argv {
  return yargs
}

export async function handler() {
  const username = await logger.prompt('Enter name:', {
    type: 'text',
  })

  try {
    deleteUser(username)
  } catch (error) {
    logger.error(error as string)
    return
  }
  logger.log(`Created user: ${green(bold(username))}!`)
}
