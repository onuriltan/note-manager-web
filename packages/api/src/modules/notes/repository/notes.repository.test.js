const noteEntity = require('../entity/note.entity')
const noteRepository = require('./note.repository')

jest.mock('mongodb')
jest.mock('../entity/note.entity')

describe(`${noteRepository.findNotes.name} Repository`, () => {
  it(`should return the result of NoteEntity.paginate`, async () => {
    // Arrange
    const email = 'onur@iltan.com'
    const options = {}
    const paginate = jest.spyOn(noteEntity, 'paginate').mockReturnValue([])

    // Act
    await noteRepository.findNotes(email, options)

    // Assert
    expect(paginate).toHaveBeenCalledWith({ email }, { ...options, lean: true })
  })
})

describe(`${noteRepository.findNotesBetweenDatesandKeyword.name} Repository`, () => {
  const fromDate = new Date(1995, 11, 17)
  const toDate = new Date(1995, 11, 18)
  const keyword = 'keyword'
  const email = 'onur@iltan.com'
  const options = {}
  const paginate = jest.spyOn(noteEntity, 'paginate').mockReturnValue([])

  it(`should return the result of NoteEntity.paginate`, async () => {
    // Arrange
    const query = {
      email: email,
      createdAt: {
        $gte: fromDate,
        $lt: toDate,
      },
      text: { $regex: new RegExp(`${keyword}`, 'i') },
    }

    // Act
    await noteRepository.findNotesBetweenDatesandKeyword(
      fromDate,
      toDate,
      keyword,
      email,
      options
    )

    // Assert
    expect(paginate).toHaveBeenCalledWith(query, {
      ...options,
      lean: true,
      sort: { date: -1 },
    })
  })

  it(`should not add text to query if no keyword is coming`, async () => {
    // Arrange
    const keyword = ''
    const query = {
      email: email,
      createdAt: {
        $gte: fromDate,
        $lt: toDate,
      },
    }

    // Act
    await noteRepository.findNotesBetweenDatesandKeyword(
      fromDate,
      toDate,
      keyword,
      email,
      options
    )

    // Assert
    expect(paginate).toHaveBeenCalledWith(query, {
      ...options,
      lean: true,
      sort: { date: -1 },
    })
  })
})
