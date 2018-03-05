/* eslint no-unused-vars: [2, {'varsIgnorePattern':'SettingsHandler'}] */

class SettingsHandler {
  static toggleSettingsVisibility() {
    if (this.settingsVisible) {
      document.getElementById('settings-container').style.display = 'none'
      document.getElementById('content-container').style.display = 'block'
    } else {
      document.getElementById('content-container').style.display = 'none'
      document.getElementById('settings-container').style.display = 'block'
    }
    this.settingsVisible = !this.settingsVisible
  }

  static updateSettings(field, value) {
    LOCALSTORAGEOBJECT.addKeyValue(field, value)
  }
}
