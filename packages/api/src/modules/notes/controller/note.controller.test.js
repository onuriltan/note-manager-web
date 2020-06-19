const noteController = require('./note.controller')
const noteRepository = require('../repository/note.repository')
const noteService = require('../service/note.service')

jest.mock('../service/note.service')
jest.mock('../repository/note.repository')

describe(`${noteController.findNotes.name}`, () => {
  it(`should call ${noteRepository.findNotes.name} from repostitory and returns response`, async () => {
    // Arrange
    const mockRequest = {
      query: {
        email: 'onur@iltan.com',
        limit: 1,
        page: 1,
      },
    }
    const mockResponse = {
      send: jest.fn(),
    }
    const findNotes = jest.spyOn(noteService, 'findNotes').mockReturnValue([])

    // Act
    await noteController.findNotes(mockRequest, mockResponse)

    // Assert
    expect(findNotes).toHaveBeenCalledWith(mockRequest.query.email, {
      limit: mockRequest.query.limit,
      page: mockRequest.query.page,
    })
    expect(mockResponse.send).toHaveBeenCalledWith([])
  })
})

describe(`${noteController.createNote.name}`, () => {
  const resSend = jest.fn()
  const resStatus = jest.fn()
  const resSet = jest.fn()
  const mockResponse = {
    set: resSet,
    status: resStatus,
    send: resSend,
  }
  beforeAll(() => {
    resSend.mockImplementation(() => mockResponse)
    resStatus.mockImplementation(() => mockResponse)
    resSet.mockImplementation(() => mockResponse)
  })
  it(`should call ${noteRepository.createNote.name} from repostitory and returns response`, async () => {
    // Arrange
    const mockRequest = {
      query: {
        email: 'onur@iltan.com',
      },
      body: {
        text: 'text',
      },
    }
    const createNote = jest
      .spyOn(noteRepository, 'createNote')
      .mockReturnValue([])

    // Act
    await noteController.createNote(mockRequest, mockResponse)

    // Assert
    expect(createNote).toHaveBeenCalledWith('text', mockRequest.query.email)
    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.send).toHaveBeenCalledWith([])
  })
})
