import { join } from 'path'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { Product } from '../types'

type Data = {
  products: Product[]
}

const file = join(__dirname, './products.json')

const adapter = new JSONFile<Data>(file)
const db = new Low<Data>(adapter, { products: [] })

export async function getProducts(): Promise<Product[]> {
  try {
    await db.read()
    return db.data.products
  } catch (error) {
    throw `Database operation failed: ${error}`
  }
}

export async function getProductByBarcode(barcode: string): Promise<Product | undefined> {
  try {
    await db.read()

    const product = db.data.products.find((u) => u.barcode === barcode)

    if (product === undefined) {
      throw `Product with barcode ${barcode} does not exists!`
    }

    return product
  } catch (error) {
    throw `Database operation failed: ${error}`
  }
}
