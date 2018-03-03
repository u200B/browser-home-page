class Debugger {
  constructor() {
    console.basefn = console.error
    console.error = (message) => {
        message = typeof message === 'object' ?
          JSON.stringify(message, null, 2) : message
        document.getElementById('debugger')
          .innerHTML += '<p>' + message + '</p>' + '</br>'
        console.basefn(message)
    }
  }
}
