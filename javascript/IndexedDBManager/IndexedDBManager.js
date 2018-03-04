class IndexedDBManager {
  static storeImage(file) {
    return new Promise((resolve, reject) => {
      this._loadDatabase()
      this.dbp.open()
      .then(event => {
        return this.dbp.transaction(this.dbp.db
          .transaction('images', 'readwrite')
          .objectStore('images').put(file))
      })
      .then(event => {
        this.dbp.close()
        resolve(event)
      })
      .catch(error => {
        console.error(error)
        reject(error)
      })
    })
  }

  static getImageByKey(key) {
    return new Promise((resolve, reject) => {
      this._loadDatabase()
      this.dbp.open()
      .then(event => {
        return this.dbp.transaction(this.dbp.db
          .transaction('images', 'readonly')
          .objectStore('images').get(key))
      })
      .then(event => {
        this.dbp.close()
        resolve(event)
      })
      .catch(error => {
        console.error(error)
        reject(error)
      })
    })
  }

  static getRandomImage() {
    return new Promise((resolve, reject) => {
      this._loadDatabase()
      this.dbp.open()
      .then(event => {
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
        console.error(error)
        reject(error)
      })
    })
  }

  static getAllImages() {
    this._loadDatabase()
    return new Promise((resolve, reject) => {
      this.dbp.open()
      .then(event => {
        return this.dbp.transaction(this.dbp.db
          .transaction('images', 'readonly')
          .objectStore('images').getAll())
      })
      .then(event => {
        this.dbp.close()
        resolve(event)
      })
      .catch(error => {
        console.error(error)
        reject(error)
      })
    })
  }

  static clearAllImages() {
    this._loadDatabase()
    return new Promise((resolve, reject) => {
      this.dbp.open()
      .then(event => {
        return this.dbp.transaction(this.dbp.db
          .transaction('images', 'readwrite')
          .objectStore('images').clear())
      })
      .then(event => {
        this.dbp.close()
        resolve(event)
      })
      .catch(error => {
        console.error(error)
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
