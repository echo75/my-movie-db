const fs = require('fs')

class JSONReader {
  constructor(filePath) {
    this.filePath = filePath
  }

  readJSON() {
    try {
      const dataJSON = fs.readFileSync(this.filePath, 'utf8')
      return JSON.parse(dataJSON)
    } catch (error) {
      console.error('Error reading or parsing the JSON file:', error)
      return null
    }
  }
}

module.exports = JSONReader
