import { join } from 'path'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { User } from '../types'

type Data = {
  users: User[]
}

const file = join(__dirname, './users.json')

const adapter = new JSONFile<Data>(file)
const db = new Low<Data>(adapter, { users: [] }) // { users: [] } is our default data

export async function addUser(username: string): Promise<void> {
  try {
    await db.read()

    const usersList = db.data.users

    if (usersList.find((u) => u.name === username)) {
      throw `User with name ${username} already exists!`
    }

    usersList.push({
      name: username,
      balance: 0,
    })

    // Write the updated memory state back to your users.json file safely
    await db.write()
  } catch (error) {
    throw `Database operation failed: ${error}`
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    await db.read()
    return db.data.users
  } catch (error) {
    throw `Database operation failed: ${error}`
  }
}

export async function deleteUser(username: string): Promise<void> {
  try {
    await db.read()

    const usersList = db.data.users
    const userIndex = usersList.findIndex((u) => u.name === username)

    if (userIndex === -1) {
      throw `User with name ${username} does not exist!`
    }

    usersList.splice(userIndex, 1)

    await db.write()
  } catch (error) {
    throw `Database operation failed: ${error}`
  }
}

export async function getBalance(username: string): Promise<number> {
  try {
    await db.read()

    const usersList = db.data.users
    const user = usersList.find((u) => u.name === username)

    if (!user) {
      throw `User with name ${username} does not exist!`
    }

    return user.balance
  } catch (error) {
    throw `Database operation failed: ${error}`
  }
}

export async function updateBalance(username: string, newBalance: number): Promise<void> {
  try {
    await db.read()

    const usersList = db.data.users
    const user = usersList.find((u) => u.name === username)

    if (!user) {
      throw `User with name ${username} does not exist!`
    }

    user.balance = newBalance

    await db.write()
  } catch (error) {
    throw `Database operation failed: ${error}`
  }
}
