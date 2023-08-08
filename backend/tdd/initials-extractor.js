const exeptions = ['zu', 'van', 'von', 'der', 'den']
const exeptionsRegex = new RegExp(`\\b(${exeptions.join('|')})\\b`, 'gi')

module.exports = function (name) {
  const names = name.split(' ')

  if (names.length > 10) {
    throw new Error('Too many names')
  }

  return names
    .filter(name => name[0].toUpperCase() == name[0] || exeptionsRegex.test(name))
    .map(name => name[0])
    .join('')
}
