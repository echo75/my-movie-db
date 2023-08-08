const intialExtractor = require('./initials-extractor')

describe('initials-extractor', () => {
  it('should extract the initial of name', () => {
    const actualOutput = intialExtractor('Johan Hedman')
    const expectedOutput = 'JH'
    expect(actualOutput).toBe(expectedOutput)
  })
  it('should extract the initial of name with a middle name', () => {
    const actualOutput = intialExtractor('John Doe Smith')
    const expectedOutput = 'JDS'
    expect(actualOutput).toBe(expectedOutput)
  })
  it('should extract the initial of name with multiple middel names', () => {
    const actualOutput = intialExtractor('Antonio Martinez de la Cruz')
    const expectedOutput = 'AMC'
    expect(actualOutput).toBe(expectedOutput)
  })
  it('should extract the initial of name with multiple middel names', () => {
    const actualOutput = intialExtractor('Karl Theodor zu Guttenberg')
    const expectedOutput = 'KTzG'
    expect(actualOutput).toBe(expectedOutput)
  })
  it('should throw an error if too many names', () => {
    const name = 'Karl Theodor Zu Guttenberg Von Der Leyen Maier Keller Eisenbach Müller'
    expect(() => intialExtractor(name)).toThrow('Too many names')
  })
})
