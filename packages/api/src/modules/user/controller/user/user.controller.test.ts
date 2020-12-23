import { Request, Response } from 'express'
import { SignUpMethod, UserEntityInput } from '../../entity/user.entity'
import * as userRepository from '../../repository/user'
import { getUser } from './user.controller'

jest.mock('../../repository/user')
jest.mock('lodash')

describe('getUser tests', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  beforeEach(() => {
    mockRequest = ({ query: { email: 'onur@gmail.com' } } as unknown) as Request
    const resStatus = jest.fn()
    const resSend = jest.fn()
    mockResponse = ({
      status: resStatus,
      send: resSend,
    } as unknown) as Response
    resStatus.mockImplementation(() => mockResponse)
    resSend.mockImplementation(() => mockResponse)
  })

  it('should call userRepository.getUser and returns as result', async () => {
    // Arrange
    const user: UserEntityInput = {
      active: true,
      method: SignUpMethod.LOCAL,
      confirmationToken: 'confirmationToken',
    }
    const getUserRepo = jest
      .spyOn(userRepository, 'getUser')
      .mockResolvedValue(user)

    // Act
    await getUser(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(getUserRepo).toHaveBeenCalledWith(mockRequest?.query?.email)
    expect(mockResponse.send).toHaveBeenCalledWith(user)
  })

  it('should call userRepository.getUser and returns response with status 404', async () => {
    // Arrange
    const getUserRepo = jest
      .spyOn(userRepository, 'getUser')
      .mockResolvedValue(null)

    // Act
    await getUser(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(getUserRepo).toHaveBeenCalledWith(mockRequest?.query?.email)
    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.send).toHaveBeenCalledWith()
  })
})
