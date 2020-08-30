import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUsersRepository from '../repositories/IUsersRepository'

import User from '../infra/typeorm/entities/User'

interface IRequest {
  userId: string
  name: string
  email: string
  oldPassword?: string
  password?: string
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    userId,
    name,
    email,
    password,
    oldPassword
  }: IRequest): Promise<User> {
    const user = await this.repository.findById(userId)

    if (!user) throw new AppError('User not found.')

    const newEmailExists = await this.repository.findByEmail(email)

    if (newEmailExists && newEmailExists.id !== userId)
      throw new AppError('E-mail already in use.')

    user.name = name
    user.email = email

    if (password) {
      if (!oldPassword)
        throw new AppError('You need to inform the old password.')

      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password
      )

      if (!checkOldPassword) throw new AppError('Old password does not match.')

      user.password = await this.hashProvider.generateHash(password)
    }

    return this.repository.save(user)
  }
}

export default UpdateProfileService
