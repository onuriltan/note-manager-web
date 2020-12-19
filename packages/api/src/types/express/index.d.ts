import { AppUser } from '../../modules/user/entity/user.entity'

declare global {
  namespace Express {
    interface Request {
      token: string
      appUser: AppUser
      email: string
      limit: string
      page: string
      fromDate: Date
      toDate: Date
      keyword: string
    }
  }
}

export {}
