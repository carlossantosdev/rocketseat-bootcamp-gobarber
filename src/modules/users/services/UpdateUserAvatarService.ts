import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

import User from '../infra/typeorm/entities/User'

interface IRequest {
  userId: string
  avatarFileName: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const user = await this.repository.findById(userId)

    if (!user)
      throw new AppError(
        'Only authenticated users can change your own avatar.',
        401
      )

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatarFileName)

    user.avatar = filename

    await this.repository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
