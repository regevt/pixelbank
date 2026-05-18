import * as addUserCommand from './users/addUserCommand'
import * as deleteUserCommand from './users/deleteUserCommand'
import * as getProductsCommand from './products/getProductsCommand'
import * as buyProductCommand from './products/buyProductCommand'

const userCommands = [addUserCommand, deleteUserCommand]
const productCommands = [getProductsCommand, buyProductCommand]

export const commands = [...userCommands, ...productCommands]
