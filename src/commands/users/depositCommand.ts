import { ArgumentsCamelCase, Argv } from 'yargs'
import { logger } from '../../logger'
import { bold, green, red } from 'picocolors'
import { getBalance, updateBalance } from '../../data/usersDB'

export const command = 'deposit <amount>'
export const describe = 'Deposit into user account'

export interface DepositArgv {
  amount: number
}

export function builder(yargs: Argv<DepositArgv>): Argv {
  return yargs.positional('amount', {
    type: 'string',
    description: 'Amount to deposit',
  })
}

export async function handler(argv: ArgumentsCamelCase<DepositArgv>) {
  if (isNaN(argv.amount) || argv.amount === 0) {
    logger.error(red('amount must be a positive number'))
    return
  }

  const username = await logger.prompt('Enter name:', {
    type: 'text',
  })

  if (username === undefined || username === '') {
    return
  }

  try {
    const balance = await getBalance(username)
    const newBalance = Number(balance) + Number(argv.amount * 100)
    updateBalance(username, newBalance)
    logger.log(`New balance for ${green(bold(username))}: ${balance / 100} + ${argv.amount} = ${newBalance / 100} `, {
      user: username,
      tags: ['app', 'users'],
    })
  } catch (error) {
    logger.error(error as string, { tags: ['app'] })
    return
  }
}
