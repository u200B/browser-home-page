/* eslint no-unused-vars: [2, {'varsIgnorePattern':'SettingsButton'}] */

class SettingsButton {
  static animate() {
    let animateOnceDuration = 1000
    SettingsButton.animateOnce(50, 75, animateOnceDuration)
    setTimeout(() => {
      SettingsButton.animateOnce(50, 75, animateOnceDuration)
    }, animateOnceDuration)
    setTimeout(() => {
      SettingsButton.animateOnce(50, 75, animateOnceDuration)
    }, 2*animateOnceDuration)
    setTimeout(() => {
      SettingsButton.animateOnce(50, 75, animateOnceDuration)
    }, 3*animateOnceDuration)
    setTimeout(() => {
      SettingsButton.animateOnce(50, 75, animateOnceDuration)
    }, 4*animateOnceDuration)
  }

  static animateOnce(startSize, maxSize, durationInSeconds) {
    let size = startSize + 1
    document.getElementById('settings-button-image').style.width = size
    document.getElementById('settings-button-image').style.height = size

    let pixelRange = maxSize - startSize
    let setTimeoutInterval = pixelRange*2 / (durationInSeconds * 1.0)

    SettingsButton.animateTimeout(size, startSize, maxSize, setTimeoutInterval, true)

  }

  static animateTimeout(size, startSize, maxSize, setTimeoutInterval, increment) {
    setTimeout(() => {
      if (increment) {
        size += 1
        document.getElementById('settings-button-image').style.width = size
        document.getElementById('settings-button-image').style.height = size
        increment = size < maxSize ? true : false
        SettingsButton.animateTimeout(size, startSize, maxSize, setTimeoutInterval, increment)
      } else {
        size -= 1
        document.getElementById('settings-button-image').style.width = size
        document.getElementById('settings-button-image').style.height = size
        size <= startSize ? '' : SettingsButton.animateTimeout(size, startSize, maxSize, setTimeoutInterval, increment)
      }
    }, setTimeoutInterval)
  }
}
