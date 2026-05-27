import { join } from 'path'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { Transaction } from '../types'

type Data = {
  transactions: Transaction[]
}

const file = join(__dirname, './transactions.json')

const adapter = new JSONFile<Data>(file)
const db = new Low<Data>(adapter, { transactions: [] })

export async function getTransactions(): Promise<Transaction[]> {
  try {
    await db.read()
    return db.data.transactions
  } catch (error) {
    throw `Database operation failed: ${error}`
  }
}

export async function addTransaction(transaction: Transaction): Promise<void> {
  try {
    await db.read()
    db.data.transactions.push(transaction)
    await db.write()
  } catch (error) {
    throw `Database operation failed: ${error}`
  }
}
