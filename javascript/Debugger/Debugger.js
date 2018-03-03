class Debugger {
  constructor() {
    console.basefn = console.error
    console.error = (message) => {
        // append error to dom here
        document.getElementById('debugger')
          .innerHTML += '<p>' + message + '</p>' + '</br>'
        console.basefn(message)
    }
  }
}
