import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import yargs, { CommandModule } from 'yargs'
import { config } from 'dotenv'
import { commands } from '../src'
import { bgBlue, blue, bold, cyan, red } from 'picocolors'
import { getProducts } from '../src/data/productsDB'
import { logger } from '../src/logger'

config()

function createCli(argv: string[] | string) {
  const run = yargs(argv)
  run.usage(
    bgBlue(
      `Welcome to the CLI application powered by ${bold(red('cli-typescript-starter'))}!
    See more on https://github.com/kucherenko/cli-typescript-starter`,
    ),
  )

  for (const command of commands) {
    run.command(command as CommandModule)
  }

  return run
}

async function executeCommand(argv: string[] | string) {
  const initialCli = createCli(argv)
    .demandCommand(1, 'You need at least one command before moving on')
    .help()
    .exitProcess(false)

  const parsedArgv = await initialCli.parseAsync()

  if (parsedArgv.help || parsedArgv.version) return

  const commandTokens = parsedArgv._ as string[]
  if (commandTokens.length === 0) return

  const primaryToken = commandTokens[0]
  const products = await getProducts()

  const product = products.find((prod) => prod.barcode == primaryToken)
  if (product !== undefined) {
    output.write('\u001b[1A\u001b[2K')
    logger.log(`${blue(product.description)} ${blue(product.price)}€`)
    const fallbackArgs: string[] = ['buy', String(primaryToken)]
    await createCli(fallbackArgs).exitProcess(false).parseAsync()

    return
  }

  if (!commands.some((cmd) => cmd.command.split(' ')[0] === primaryToken)) {
    logger.error(`${primaryToken}: No such product, user, or command`)
  }
}

async function startRepl() {
  while (true) {
    input.resume()

    const repl = createInterface({ input, output })
    let line = ''

    repl.on('SIGINT', () => {
      repl.close()
    })

    try {
      line = (await repl.question(cyan('pixelbank> '))).trim()
    } catch {
      repl.close()
      break
    }

    repl.close()

    if (!line) {
      continue
    }

    if (line === 'exit' || line === 'quit') {
      break
    }

    try {
      await executeCommand(line)
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      logger.error(`${red(message)}\n`)
    } finally {
      input.resume()
    }
  }
}

async function main() {
  const initialArgs = process.argv.slice(2)

  if (initialArgs.length > 0) {
    await executeCommand(initialArgs)
  }

  await startRepl()
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  logger.error(`${red(message)}\n`)
  process.exitCode = 1
})
