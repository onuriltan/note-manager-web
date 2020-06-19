const noteService = require('./note.service')
const noteRepository = require('../repository/note.repository')

jest.mock('../repository/note.repository')

describe(`${noteService.findNotes.name} Service`, () => {
  it(`should call ${noteRepository.findNotes.name} from repostitory and return result`, async () => {
    // Arrange
    const mockEmail = 'onur@iltan.com'
    const mockLimitAndPage = {
      limit: 10,
      page: 1,
    }
    const findNotes = jest
      .spyOn(noteRepository, 'findNotes')
      .mockReturnValue('note')

    // Act
    const result = await noteService.findNotes(mockEmail, mockLimitAndPage)

    // Assert
    expect(findNotes).toHaveBeenCalledWith(mockEmail, {
      ...mockLimitAndPage,
      sort: { date: -1 },
    })
    expect(result).toBe('note')
  })
})
