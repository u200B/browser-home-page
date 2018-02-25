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

  /* ARRAY */

  append(item) {
    this.checkTypeForMethod(this.typeOptions.array)

    if (!localStorage.getItem(this.keyName)) {
      create(this.keyName)
    }

    var arr = JSON.parse(localStorage.getItem(this.keyName))
    arr.push(item)
    localStorage.setItem(this.keyName,
      JSON.stringify(arr)
    )
  }

  /* SHARED */
  create(keyName) {
    if (this.storageType === this.typeOptions.string) {
      localStorage.setItem(keyName, '')
    } else if (this.storageType === this.typeOptions.object) {
      localStorage.setItem(keyName, '{}')
    } else if (this.storageType === this.typeOptions.array) {
      localStorage.setItem(keyName, '[]')
    }
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
