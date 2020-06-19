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
