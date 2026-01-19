import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { fixupConfigRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import eslintConfig from '@mrpharderwijk/eslint-config'
import nx from '@nx/eslint-plugin'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

const config = [
  ...fixupConfigRules(compat.extends('next')),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  ...nx.configs['flat/react-typescript'],
  ...eslintConfig,
  { ignores: ['.next/**/*'] },
]

export default config
