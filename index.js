#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const mkdirp = require('mkdirp')
const { program } = require('commander')
const logger = require('./bin/logger.js')
const { write } = require('./bin/logger.js')

program
  .arguments('[source]')
  .description('Builds a protospritesheet')
  .action((source) => {
    assembleSVGs(source, 'build/')
  })

program.parse(process.argv)

const prologue = `
<html>
<head>
  <title>icons</title>
</head>
<body>
`
const epilogue = `
</body>
</html>
`

function assembleSVGs (source, dest) {
  // Read all individual SVG files, using `glob` to make it easier to grab
  // all svgs at once from the given source directory.
  const pattern = path.join(source, '/**/*.svg')
  glob(pattern, function (error, files) {
    if (error) {
      logger.error(`Error reading SVG files: ${error}`)
    }

    logger.verbose(`Compiling SVG sprites from ${source} ...`)

    mkdirp.sync(dest)

    const writeStream = fs.createWriteStream(path.join(dest, source + '.html'))

    writeStream.write(prologue)

    files.forEach(function (file) {
      const contents = fs.readFileSync(path.join(process.cwd(), file))
      writeStream.write(contents + '\n')
      logger.info(`Adding ${file} ...`)
    })

    writeStream.write(epilogue)
    writeStream.end()
  })
}

module.exports = assembleSVGs