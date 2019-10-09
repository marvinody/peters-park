const volleyball = require('volleyball')
const path = require('path')
const express = require('express')
const app = express();
const chalk = require('chalk')
const { db } = require('./db')

app.use(volleyball)
app.use(express.json())

const staticFolder = path.join(__dirname, '..', '..', 'static')
app.use(express.static(staticFolder))

app.use('/api', require('./api'))

app.use('*', (req, res) => {
  res.sendFile(path.join(staticFolder, 'index.html'))
})

// custom error handling from https://github.com/FullstackAcademy/codys-cafe
app.use((err, req, res, next) => {
  // just in case
  if (!err.stack || !err.message) next(err)
  // clean up the trace to just relevant info
  const cleanTrace = err.stack
    .split('\n')
    .filter(line => {
      // comment out the next two lines for full (verbose) stack traces
      const projectFile = line.indexOf(__dirname) > -1 // omit built-in Node code
      const nodeModule = line.indexOf('node_modules') > -1 // omit npm modules
      return projectFile && !nodeModule
    })
    .join('\n')
  // colorize and format the output
  console.log(chalk.magenta('      ' + err.message))
  console.log('    ' + chalk.gray(cleanTrace))
  // send back error status
  res.status(err.status || 500).end()
})

app.listen(3000, () => {
  console.log("Hello Seattle. I'm listening")
  db.sync({ force: true })
})
