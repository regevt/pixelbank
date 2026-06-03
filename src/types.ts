import { LogObject } from 'consola'

export interface Product {
  barcode: string
  description: string
  price: number
  display_price: string
}

export interface User {
  name: string
  balance: number
  updated_at: string
  created_at: string
}

export interface Transaction {
  user: string
  product: string
  date: string
}

export type LogEntry = {
  timestamp: string
  level: string
  tag?: string[]
  message: string
  user?: string
}

export interface LogObjectEntry extends LogObject {
  args: {
    user?: string
    tags?: string[]
  }[]
}
