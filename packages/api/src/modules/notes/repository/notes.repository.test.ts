/* eslint-disable @typescript-eslint/no-explicit-any */
import noteEntity from '../entity/note.entity'
import {
  findNotes,
  findNotesBetweenDatesandKeyword,
  createNote,
  editNote,
  deleteNote,
} from './note.repository'
import { logger } from '../../../config/pino'

jest.mock('../entity/note.entity')
jest.mock('../../../config/pino')

describe(`findNotes repository`, () => {
  const loggerError = jest.spyOn(logger, 'error')

  beforeEach(() => jest.clearAllMocks())

  it(`should return the result of NoteEntity.paginate`, async () => {
    // Arrange
    const email = 'onur@iltan.com'
    const options = {}

    const paginate = jest
      .spyOn(noteEntity, 'paginate')
      .mockResolvedValue([] as any)

    // Act
    await findNotes(email, options)

    // Assert
    expect(paginate).toHaveBeenCalledWith({ email }, { ...options, lean: true })
  })

  it(`should log the error if NoteEntity.paginate throws error`, async () => {
    // Arrange
    const email = 'onur@iltan.com'
    const options = {}
    jest.spyOn(noteEntity, 'paginate').mockRejectedValue('database error')

    // Act
    await findNotes(email, options)

    // Assert
    expect(loggerError).toHaveBeenCalledWith('database error')
  })
})

describe(`findNotesBetweenDatesandKeyword repository`, () => {
  const fromDate = new Date(1995, 11, 17)
  const toDate = new Date(1995, 11, 18)
  const keyword = 'keyword'
  const email = 'onur@iltan.com'
  const options = {}
  const paginate = jest.spyOn(noteEntity, 'paginate').mockReturnValue([] as any)
  const loggerError = jest.spyOn(logger, 'error')

  beforeEach(() => jest.clearAllMocks())

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
    await findNotesBetweenDatesandKeyword(
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
      text: '',
    }

    // Act
    await findNotesBetweenDatesandKeyword(
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

  it(`should log the error if NoteEntity.paginate throws error`, async () => {
    // Arrange
    const keyword = ''

    // Act
    await findNotesBetweenDatesandKeyword(
      fromDate,
      toDate,
      keyword,
      email,
      options
    )

    // Assert
    expect(loggerError).toHaveBeenCalledWith('database error')
  })
})

describe(`createNote Repository`, () => {
  const loggerError = jest.spyOn(logger, 'error')

  beforeEach(() => jest.clearAllMocks())

  it(`should return the result of NoteEntity.save`, async () => {
    // Arrange
    const email = 'onur@iltan.com'
    const text = 'text'
    const save = (noteEntity.prototype.save = jest
      .fn()
      .mockResolvedValue({ text, email }))

    // Act
    const result = await createNote(text, email)

    // Assert
    expect(noteEntity).toHaveBeenCalledWith({
      text,
      email,
    })
    expect(save).toHaveBeenCalledWith()
    expect(result).toEqual({ text, email })
  })

  it(`should log the error if NoteEntity.paginate throws error`, async () => {
    // Arrange
    const email = 'onur@iltan.com'
    const text = 'text'
    noteEntity.prototype.save = jest.fn().mockRejectedValue('database error')

    // Act
    await createNote(text, email)

    // Assert
    expect(loggerError).toHaveBeenCalledWith('database error')
  })
})

describe(`editNote Repository`, () => {
  const loggerError = jest.spyOn(logger, 'error')
  const id = 'asd324rsdf2'
  const email = 'onur@iltan.com'
  const text = 'text'

  beforeEach(() => jest.clearAllMocks())

  it(`should return the result of NoteEntity.findOneAndUpdate`, async () => {
    // Arrange
    jest
      .spyOn(noteEntity, 'findOneAndUpdate')
      .mockResolvedValue({ text, email } as any)

    // Act
    const result = await editNote(id, email, text)

    // Assert
    expect(noteEntity.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: id, email },
      { text }
    )
    expect(result).toEqual({ text, email })
  })

  it(`should log the error if NoteEntity.findOneAndUpdate throws error`, async () => {
    // Arrange
    jest
      .spyOn(noteEntity, 'findOneAndUpdate')
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .mockRejectedValue('database error')

    // Act
    await editNote(id, email, text)

    // Assert
    expect(loggerError).toHaveBeenCalledWith('database error')
  })
})

describe(`deleteNote repository`, () => {
  const loggerError = jest.spyOn(logger, 'error')
  const id = 'asd324rsdf2'
  const email = 'onur@iltan.com'

  beforeEach(() => jest.clearAllMocks())

  it(`should return true if NoteEntity.deleteOne is not empty`, async () => {
    // Arrange
    jest.spyOn(noteEntity, 'deleteOne').mockResolvedValue('' as any)

    // Act
    const result = await deleteNote(email, id)

    // Assert
    expect(noteEntity.deleteOne).toHaveBeenCalledWith({
      _id: id,
      email,
    })
    expect(result).toEqual(false)
  })

  it(`should return false if NoteEntity.deleteOne is empty`, async () => {
    // Arrange
    jest.spyOn(noteEntity, 'deleteOne').mockResolvedValue({ _id: id } as any)

    // Act
    const result = await deleteNote(email, id)

    // Assert
    expect(noteEntity.deleteOne).toHaveBeenCalledWith({
      _id: id,
      email,
    })
    expect(result).toEqual(true)
  })

  it(`should log the error if NoteEntity.deleteOne throws error`, async () => {
    // Arrange
    jest.spyOn(noteEntity, 'deleteOne').mockRejectedValue('database error')

    // Act
    await deleteNote(email, id)

    // Assert
    expect(loggerError).toHaveBeenCalledWith('database error')
  })
})
