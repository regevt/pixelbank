import { Argv } from 'yargs'
import { logger } from '../../logger'
import { bold, green, blue } from 'picocolors'
import { getProducts } from '../../data/productsDB'

export const command = 'products'
export const describe = 'Get all products'

export function builder(yargs: Argv<unknown>): Argv {
  return yargs
}

export async function handler() {
  try {
    const products = await getProducts()

    for (const product of products) {
      logger.log(`${green(bold(product.description))} - ${blue(bold(product.display_price + '€'))}`)
    }

    logger.log(``)
  } catch (error) {
    logger.error(error as string, { tags: ['app'] })
  }
}
