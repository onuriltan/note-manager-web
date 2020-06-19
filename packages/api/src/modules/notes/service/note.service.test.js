const noteService = require('./note.service')
const noteRepository = require('../repository/note.repository')

jest.mock('../repository/note.repository')

describe(`${noteService.findNotes.name}`, () => {
  it(`should call ${noteRepository.findNotes.name} from repostitory and return result`, async () => {
    // Arrange
    const mockEmail = 'onur@iltan.com'
    const findNotes = jest
      .spyOn(noteRepository, 'findNotes')
      .mockReturnValue('note')

    // Act
    const result = await noteService.findNotes(mockEmail, {
      limit: 10,
      page: 1,
    })

    // Assert
    expect(findNotes).toHaveBeenCalledWith(mockEmail, {
      limit: 10,
      page: 1,
      sort: { date: -1 },
    })
    expect(result).toBe('note')
  })
})
