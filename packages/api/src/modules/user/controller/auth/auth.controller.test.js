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
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call jwt.signToken and call the res.json with jwt.signToken result', async () => {
    // Arrange
    const req = { ...mockRequest }
    const res = { ...mockResponse }
    const signToken = jest.spyOn(jwt, 'signToken').mockResolvedValue('token')

    // Act
    await loginWithSocial(req, res)

    // Assert
    expect(signToken).toHaveBeenCalledWith(req.user)
    expect(res.json).toHaveBeenCalledWith({
      token: 'token',
      method: req.user.method,
    })
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
