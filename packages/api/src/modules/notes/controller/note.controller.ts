import * as noteRepository from '../repository/note.repository'
import * as noteService from '../service/note.service'
import { Request, Response } from 'express'

export const findNotes = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, limit, page } = req.query
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const notes = await noteService.findNotes(email, { limit, page })
  return res.send(notes)
}

export const findNotesBetweenDatesandKeyword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, limit, page } = req.query
  const fromDate = new Date(req.params.fromDate)
  const toDate = new Date(req.params.toDate)
  const keyword = req.params.keyword
  const notes = await noteRepository.findNotesBetweenDatesandKeyword(
    fromDate,
    toDate,
    keyword,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    email,
    { page, limit }
  )
  return res.send(notes)
}

export const createNote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.query
  const { text } = req.body
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const newPost = await noteRepository.createNote(text, email)
  return res.status(201).send(newPost)
}

export const editNote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.query
  const { text } = req.body
  const id = req.params.id
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const updatedNote = await noteRepository.editNote(id, email, text)
  return res.send(updatedNote)
}

export const deleteNote = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email } = req.query
  const id = req.params.id
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const deletedNote = await noteRepository.deleteNote(email, id)
  return deletedNote ? res.status(201).send() : res.status(400).send()
}
