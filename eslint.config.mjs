import globals from 'globals'

import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginJs from '@eslint/js'

// mimic CommonJS variables -- not needed if using CommonJS
const _FILENAME = fileURLToPath(import.meta.url)
const _DIRNAME = path.dirname(_FILENAME)
const compat = new FlatCompat({ baseDirectory: _DIRNAME, recommendedConfig: pluginJs.configs.recommended })

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  ...compat.extends('standard-with-typescript')
]
