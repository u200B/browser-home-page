/* eslint no-unused-vars: [2, {'varsIgnorePattern':'IndexedDBManager'}] */

class IndexedDBManager {
  static storeImage(file) {
    return new Promise((resolve, reject) => {
      this._loadDatabase()
      this.dbp.open()
        .then(() => {
          return this.dbp.transaction(this.dbp.db
            .transaction('images', 'readwrite')
            .objectStore('images').put(file))
        })
        .then(event => {
          this.dbp.close()
          resolve(event)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static getImageByKey(key) {
    return new Promise((resolve, reject) => {
      this._loadDatabase()
      this.dbp.open()
        .then(() => {
          return this.dbp.transaction(this.dbp.db
            .transaction('images', 'readonly')
            .objectStore('images').get(key))
        })
        .then(event => {
          this.dbp.close()
          resolve(event)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static getRandomImage() {
    return new Promise((resolve, reject) => {
      this._loadDatabase()
      this.dbp.open()
        .then(() => {
          return this.dbp.transaction(this.dbp.db
            .transaction('images', 'readonly')
            .objectStore('images').getAll())
        })
        .then(event => {
          this.dbp.close()
          resolve({
            target: {
              result: event.target.result[Math.floor(Math.random()*event.target.result.length)]
            }
          })
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static getAllImagesWithKeys() {
    this._loadDatabase()
    return new Promise((resolve, reject) => {
      let imageArrayWithKeys = []
      this.dbp.open()
        .then(() => {
          return new Promise((resolve, reject) => {
            this.dbp.cursor(this.dbp.db
              .transaction('images', 'readonly')
              .objectStore('images').openCursor(),

            (event) => {
              if (event && event.target && event.target.result) {
                imageArrayWithKeys.push({
                  key: event.target.result.key,
                  value: event.target.result.value
                })
                event.target.result.continue()
              } else {
                resolve(imageArrayWithKeys)
              }
            },

            (event) => {
              reject(event)
            }
            )
          })
        })
        .then(event => {
          this.dbp.close()
          resolve(event)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static clearImageByKey(key) {
    this._loadDatabase()
    return new Promise((resolve, reject) => {
      this.dbp.open()
        .then(() => {
          return this.dbp.transaction(this.dbp.db
            .transaction('images', 'readwrite')
            .objectStore('images').delete(key))
        })
        .then(event => {
          this.dbp.close()
          resolve(event)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static clearAllImages() {
    this._loadDatabase()
    return new Promise((resolve, reject) => {
      this.dbp.open()
        .then(() => {
          return this.dbp.transaction(this.dbp.db
            .transaction('images', 'readwrite')
            .objectStore('images').clear())
        })
        .then(event => {
          this.dbp.close()
          resolve(event)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  static _loadDatabase() {
    this.dbName = 'ImageDatabase'
    this.dbp = new IndexedDBP(this.dbName)
    this.dbp.upgrade((event) => {
      let db = event.target.result
      let objectStore = db.createObjectStore(
        'images',
        {keyPath: undefined, autoIncrement: true}
      )
      objectStore.createIndex('image', 'image')
    })
  }
}
