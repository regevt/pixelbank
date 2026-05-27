import { ArgumentsCamelCase, Argv } from 'yargs'
import { logger } from '../../logger'
import { bold, green, blue, red } from 'picocolors'
import { getProducts } from '../../data/productsDB'
import { getBalance, updateBalance } from '../../data/usersDB'
import { addTransaction } from '../../data/transactionsDB'
import { formatPrice } from '../../helpers'

export const command = 'buy <barcode>'
export const describe = 'buy product'

export interface BuyArgv {
  barcode: string
}

export function builder(yargs: Argv<BuyArgv>): Argv {
  return yargs.positional('barcode', {
    type: 'string',
    description: 'barcode of the product to buy',
  })
}

export async function handler(argv: ArgumentsCamelCase<BuyArgv>) {
  try {
    const product = await getProducts()

    const foundProduct = product.find((p) => p.barcode === argv.barcode)

    if (foundProduct === undefined) {
      logger.error(`Product with barcode ${argv.barcode} does not exists!`)
      return
    }

    const username = await logger.prompt('Enter name:', {
      type: 'text',
    })

    const balance = await getBalance(username)

    if (balance < foundProduct.price) {
      logger.error(`Not enough balance! Your balance: ${balance}€`)
      return
    }

    await updateBalance(username, balance - foundProduct.price)

    const delta = balance - foundProduct.price

    addTransaction({
      user: username,
      product: foundProduct.description,
      date: new Date().toISOString(),
    })

    logger
      .withTag('test')
      .withTag('app,users')
      .log(
        `${blue(bold('New balance for ' + username))}: ${delta > 0 ? green(bold(formatPrice(delta) + '€')) : red(bold(formatPrice(delta) + '€'))} (Old balance: ${formatPrice(balance)}€, Product price: ${formatPrice(foundProduct.price)}€)`,
      )
  } catch (error) {
    logger.withTag('app').error(error as string)
  }
}
