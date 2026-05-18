import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import yargs, { CommandModule } from 'yargs'
import { config } from 'dotenv'
import { commands } from '../src'
import { bgBlue, bold, cyan, red } from 'picocolors'

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
  await createCli(argv)
    .demandCommand(1, 'You need at least one command before moving on')
    .help()
    .exitProcess(false)
    .parseAsync()
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
      output.write(`${red(message)}\n`)
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
  output.write(`${red(message)}\n`)
  process.exitCode = 1
})
