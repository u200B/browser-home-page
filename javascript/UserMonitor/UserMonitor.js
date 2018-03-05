/* eslint no-unused-vars: [2, {'varsIgnorePattern':'UserMonitor'}]
          no-console: [2, {allow: ["warn"]}]
*/

class UserMonitor {
  static start() {
    this.previouslyAnimated = false
    const resetUserTimer = () => {
      if (!this.previouslyAnimated) {
        clearTimeout(this.t);
        this.t = setTimeout(this.handleUserIdle, 15000)
      }
      this.previouslyAnimated = true
    }
    window.onload = resetUserTimer
    document.getElementById('body').addEventListener('mousemove', resetUserTimer)
    document.getElementById('body').addEventListener('keypress', resetUserTimer)
  }

  static handleUserIdle() {
    console.warn('User Idle Method Has Not Been Defined, Running Default')
  }

  static setHandleUserIdle(cb) {
    this.handleUserIdle = cb
  }
}
