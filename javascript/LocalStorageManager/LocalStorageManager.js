class LocalStorageManager {
  constructor(keyName, storageType) {
    this.typeOptions = {string:'STRING', object:'OBJECT', array:'ARRAY'}
    if (Object.values(this.typeOptions).indexOf(storageType) === -1) {
      throw new Error('INVALID STORAGETYPE FOR LOCAL STORAGE MANAGER')
    }
    this.keyName = keyName
    this.storageType = storageType
  }

  /* STRING */

  /* OBJECT */

  addKeyValue(key, value) {
    this.checkTypeForMethod(this.typeOptions.object)
    let obj = JSON.parse(localStorage.getItem(this.keyName))
    obj[key] = value
    localStorage.setItem(this.keyName, JSON.stringify(obj))
  }

  /* ARRAY */

  append(item) {
    this.checkTypeForMethod(this.typeOptions.array)

    if (!localStorage.getItem(this.keyName)) {
      this.create()
    }

    var arr = JSON.parse(localStorage.getItem(this.keyName))
    arr.push(item)
    localStorage.setItem(this.keyName,
      JSON.stringify(arr)
    )
  }

  /* SHARED */
  create() {
    if(!localStorage.getItem(this.keyName)) {
      if (this.storageType === this.typeOptions.string) {
        localStorage.setItem(this.keyName, '')
      } else if (this.storageType === this.typeOptions.object) {
        localStorage.setItem(this.keyName, '{}')
      } else if (this.storageType === this.typeOptions.array) {
        localStorage.setItem(this.keyName, '[]')
      }
    }
  }

  get() {
    return this.storageType === this.typeOptions.object ||
           this.storageType === this.typeOptions.array ?
           JSON.parse(localStorage.getItem(this.keyName)) :
           localStorage.getItem(this.keyName)
  }

  destroy() {
    localStorage.removeItem(this.keyName)
  }

  checkTypeForMethod(storageTypeAllowed) {
    if (this.storageType !== storageTypeAllowed) {
      throw new Error('INVALID STORAGETYPE FOR THIS METHOD CALL')
    }
  }
}
