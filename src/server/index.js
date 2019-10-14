const volleyball = require('volleyball')
const path = require('path')
const express = require('express')
const app = express();
const chalk = require('chalk')
const { db } = require('./db')

// logging middleware (different kind of morgan)
app.use(volleyball)
// parse incoming request bodies and convert them to some kinda JSONy object
app.use(express.json())

// where is all our generic stuff located? our images, stylestuff...
const staticFolder = path.join(__dirname, '..', '..', 'static')
// and let's tell express to serve STATIC assets from our STATIC folder
// the folder could be named mango. doesn't matter. just makes sense to call it static
app.use(express.static(staticFolder))

// add our custom api router
app.use('/api', require('./api'))

// notice, this line is AFTER our other stuff
// this says, if anyone requests ANYTHING ELSE, send them the index.html page
// which will load React and then you can present a route if nothing matches
app.use('*', (req, res) => {
  res.sendFile(path.join(staticFolder, 'index.html'))
})

// if a handler function has 4 parameters, it's an error handler
// this is just a lot of code because it simplifies the error code you get by ALOT
// love this code. it's amazing
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

// Finally, let's actually listen to requests
app.listen(3000, () => {
  console.log("Hello Seattle. I'm listening")
  db.sync({ force: false })
})
