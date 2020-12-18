import * as userRepository from '../../repository/user'
import { getUser } from './user.controller'

jest.mock('../../repository/user')
jest.mock('lodash')

describe('getUser tests', () => {
  const resSend = jest.fn()
  const resStatus = jest.fn()
  const resSet = jest.fn()
  const mockResponse = {
    set: resSet,
    status: resStatus,
    send: resSend,
  }
  const mockRequest = {
    query: {
      email: 'onur@iltan.com',
    },
  }

  beforeAll(() => {
    resSend.mockImplementation(() => mockResponse)
    resStatus.mockImplementation(() => mockResponse)
    resSet.mockImplementation(() => mockResponse)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call userRepository.getUser and returns as result', async () => {
    // Arrange
    const getUserRepo = jest
      .spyOn(userRepository, 'getUser')
      .mockResolvedValue('user' as any)

    // Act
    await getUser(mockRequest as any, mockResponse as any)

    // Assert
    expect(getUserRepo).toHaveBeenCalledWith(mockRequest.query.email)
    expect(mockResponse.send).toHaveBeenCalledWith('user')
  })

  it('should call userRepository.getUser and returns response with status 404', async () => {
    // Arrange
    const getUserRepo = jest
      .spyOn(userRepository, 'getUser')
      .mockResolvedValue(null)

    // Act
    await getUser(mockRequest as any, mockResponse as any)

    // Assert
    expect(getUserRepo).toHaveBeenCalledWith(mockRequest.query.email)
    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.send).toHaveBeenCalledWith()
  })
})
