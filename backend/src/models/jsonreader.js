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
      throw new Error('Error reading or parsing the JSON file: ' + error.toString())
    }
  }
}

module.exports = JSONReader
