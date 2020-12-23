/* eslint-disable @typescript-eslint/no-explicit-any */
import * as noteService from './note.service'
import * as noteRepository from '../repository/note.repository'

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
      .mockReturnValue('note' as any)

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
