const { defineConfig, globalIgnores } = require('eslint/config')

const tsParser = require('@typescript-eslint/parser')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const prettier = require('eslint-plugin-prettier')
const jest = require('eslint-plugin-jest')
const unusedImports = require('eslint-plugin-unused-imports')
const globals = require('globals')
const js = require('@eslint/js')

const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  {
    languageOptions: {
      sourceType: 'module',
      parserOptions: {},
      parser: tsParser,

      globals: {
        ...globals.node,
        ...jest.environments.globals.globals,
      },
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier,
      jest,
      'unused-imports': unusedImports,
    },

    extends: compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'),

    rules: {
      'no-console': 1,
      'prettier/prettier': 2,
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  globalIgnores([
    '**/logs',
    '**/*.log',
    '**/npm-debug.log*',
    '**/yarn-debug.log*',
    '**/yarn-error.log*',
    '**/lerna-debug.log*',
    '**/.pnpm-debug.log*',
    '**/report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json',
    '**/pids',
    '**/*.pid',
    '**/*.seed',
    '**/*.pid.lock',
    '**/lib-cov',
    '**/coverage',
    '**/*.lcov',
    '**/.nyc_output',
    '**/.grunt',
    '**/bower_components',
    '**/.lock-wscript',
    'build/Release',
    '**/node_modules/',
    '**/jspm_packages/',
    '**/web_modules/',
    '**/*.tsbuildinfo',
    '**/.npm',
    '**/.eslintcache',
    '**/.stylelintcache',
    '**/.rpt2_cache/',
    '**/.rts2_cache_cjs/',
    '**/.rts2_cache_es/',
    '**/.rts2_cache_umd/',
    '**/.node_repl_history',
    '**/*.tgz',
    '**/.yarn-integrity',
    '**/.env',
    '**/.env.development.local',
    '**/.env.test.local',
    '**/.env.production.local',
    '**/.env.local',
    '**/.cache',
    '**/.parcel-cache',
    '**/.next',
    '**/out',
    '**/.nuxt',
    '**/dist',
    '**/.cache/',
    '.vuepress/dist',
    '**/.temp',
    '**/.cache',
    '**/.docusaurus',
    '**/.serverless/',
    '**/.fusebox/',
    '**/.dynamodb/',
    '**/.tern-port',
    '**/.vscode-test',
    '.yarn/cache',
    '.yarn/unplugged',
    '.yarn/build-state.yml',
    '.yarn/install-state.gz',
    '**/.pnp.*',
    '**/bundle',
    '**/dist',
    '**/node_modules',
    '**/TODO',
    '**/.yarn',
  ]),
])
