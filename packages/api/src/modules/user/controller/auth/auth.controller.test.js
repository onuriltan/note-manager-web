const jwt = require('@middleware/jwt')
const { loginWithSocial } = require('./auth.controller')

jest.mock('../../../../middlewares/jwt')

describe('loginWithSocial tests', () => {
  const mockRequest = {
    user: {
      method: 'facebook',
    },
  }
  const mockResponse = {
    json: jest.fn(),
    status: jest.fn(),
    redirect: jest.fn(),
  }

  const OLD_ENV = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules() // most important - it clears the cache
    process.env = { ...OLD_ENV } // make a copy
  })

  afterAll(() => {
    process.env = OLD_ENV // restore old env
  })

  it('should call jwt.signToken and call the res.json with jwt.signToken result', async () => {
    // Arrange
    const req = { ...mockRequest }
    const res = { ...mockResponse }
    const signToken = jest.spyOn(jwt, 'signToken').mockResolvedValue('token')
    process.env.CLIENT_URL = 'http://localhost:8080'

    // Act
    await loginWithSocial(req, res)

    // Assert
    expect(signToken).toHaveBeenCalledWith(req.user)
    expect(res.redirect).toHaveBeenCalledWith(
      `${process.env.CLIENT_URL}/login/?${
        req.user.method
      }Token=${encodeURIComponent('token')}`
    )
  })

  it('should call res.status as 401 if no user is in the req object', async () => {
    // Arrange
    const req = { ...mockRequest, user: null }
    const res = { ...mockResponse }

    // Act
    await loginWithSocial(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(401)
  })
})
