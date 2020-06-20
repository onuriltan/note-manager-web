const noteEntity = require('../entity/note.entity')
const {
  findNotes,
  findNotesBetweenDatesandKeyword,
  createNote,
  editNote,
  deleteNote,
} = require('./note.repository')

jest.mock('../entity/note.entity')

describe(`${findNotes.name} Repository`, () => {
  it(`should return the result of NoteEntity.paginate`, async () => {
    // Arrange
    const email = 'onur@iltan.com'
    const options = {}
    const paginate = jest.spyOn(noteEntity, 'paginate').mockReturnValue([])

    // Act
    await findNotes(email, options)

    // Assert
    expect(paginate).toHaveBeenCalledWith({ email }, { ...options, lean: true })
  })
})

describe(`${findNotesBetweenDatesandKeyword.name} Repository`, () => {
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
})

describe(`${createNote.name} Repository`, () => {
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
})

describe(`${editNote.name} Repository`, () => {
  it(`should return the result of NoteEntity.findOneAndUpdate`, async () => {
    // Arrange
    const id = 'asd324rsdf2'
    const email = 'onur@iltan.com'
    const text = 'text'
    const editedAt = new Date()
    jest
      .spyOn(noteEntity, 'findOneAndUpdate')
      .mockResolvedValue({ text, email })

    // Act
    const result = await editNote(id, email, text, editedAt)

    // Assert
    expect(noteEntity.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: id, email },
      { text, editedAt }
    )
    expect(result).toEqual({ text, email })
  })
})

describe(`${deleteNote.name} Repository`, () => {
  it(`should return true if NoteEntity.deleteOne is not empty`, async () => {
    // Arrange
    const id = 'asd324rsdf2'
    const email = 'onur@iltan.com'
    jest.spyOn(noteEntity, 'deleteOne').mockResolvedValue('')

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
    const id = 'asd324rsdf2'
    const email = 'onur@iltan.com'
    jest.spyOn(noteEntity, 'deleteOne').mockResolvedValue({ _id: id })

    // Act
    const result = await deleteNote(email, id)

    // Assert
    expect(noteEntity.deleteOne).toHaveBeenCalledWith({
      _id: id,
      email,
    })
    expect(result).toEqual(true)
  })
})
