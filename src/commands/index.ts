import * as addUserCommand from './users/addUserCommand'
import * as deleteUserCommand from './users/deleteUserCommand'
import * as depositCommand from './users/depositCommand'
import * as getProductsCommand from './products/getProductsCommand'
import * as buyProductCommand from './products/buyProductCommand'

import * as getLogsForUser from './logs/getLogsCommand'

const userCommands = [addUserCommand, deleteUserCommand, depositCommand]
const productCommands = [getProductsCommand, buyProductCommand]
const logsCommands = [getLogsForUser]

export const commands = [...userCommands, ...productCommands, ...logsCommands]
