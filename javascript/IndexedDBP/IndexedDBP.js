/*** IndexedDBP - A Promisified Wrapper Around IndexedDB ***/

/*
  eslint
    no-unused-vars: [
                      2,
                      {'varsIgnorePattern':'IndexedDBP',
                       'argsIgnorePattern': 'event'
                      }
                    ],
    no-console: ["error", { allow: ["warn"] }]
*/

class IndexedDBP {
  constructor(dbName, dbVersion) {
    this._loadSupportingMethodsAndVariables()
    dbName ? this.dbName = dbName :
      this._error(['IndexedDBP requires database name',
        'to be provided in constructor'].join(' '))
    this.dbVersion = dbVersion
    this.indexedDB = this._getIndexedDB() ?
      this._getIndexedDB() : this._error(['IndexedDB not supported',
        'in current browser'].join(' '))
  }

  upgrade(upgradeMethod) {
    typeof upgradeMethod === 'function' ?
      this._runUpgrade = upgradeMethod :
      this._error(['Parameter to IndexedDBP.upgrade',
        'must be of type \'function\''].join(' '))
  }

  versionchange(versionchangeMethod) {
    typeof versionchangeMethod === 'function' ?
      this._runVersionchange = versionchangeMethod :
      this._error(['Parameter to IndexedDBP.versionchange',
        'must be of type \'function\''].join(' '))
  }

  open(upgradeCallback, versionchangeCallback) {
    return new Promise((resolve, reject) => {
      let DBOpenRequest = this.indexedDB.open(this.dbName, this.dbVersion)
      DBOpenRequest.onsuccess = (event) => {
        this.db = event.target.result
        resolve(event)
      }
      DBOpenRequest.onupgradeneeded = (event) => {
        typeof upgradeCallback === 'function' ?
          upgradeCallback(event) :
          this._runUpgrade(event)
      }
      DBOpenRequest.onversionchange = (event) => {
        typeof versionchangeCallback === 'function' ?
          versionchangeCallback(event) :
          this._runVersionchange(event)
      }
      DBOpenRequest.onblocked = (event) => {
        this._error(event)
      }
      DBOpenRequest.onerror = (event) => {
        reject(event)
      }
    })
  }

  transaction(transaction) {
    return new Promise((resolve, reject) => {
      transaction.onsuccess = (event) => {
        resolve(event)
      }
      transaction.oncomplete = (event) => {
        resolve(event)
      }
      transaction.onerror = (event) => {
        reject(event)
      }
    })
  }

  // Promisify iteration over all cursors w/ cursor.continue()
  cursor(cursor, success, failure) {
    cursor.onsuccess = (event) => {
      success(event)
    }
    cursor.onerror = (event) => {
      failure(event)
    }
  }

  close() {
    this.db.close()
  }

  _loadSupportingMethodsAndVariables() {
    this.dbName,
    this.dbVersion,
    this.db = undefined

    this._getIndexedDB = () => {
      return window.indexedDB || window.mozIndexedDB ||
        window.webkitIndexedDB || window.msIndexedDB ||
        window.shimIndexedDB
    }

    this._runUpgrade = (event) => {
      this._error('Upgrade method not defined for this database')
    }

    this._runVersionchange = (event) => {
      this._warning('No versionchange handler provided for IndexedDBP')
    }

    this._warning = (warningMsg) => {
      console.warn(warningMsg)
    }

    this._error = (errorMsg) => {
      throw new Error(errorMsg)
    }
  }
}
