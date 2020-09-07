import { injectable, inject } from 'tsyringe'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import User from '@modules/users/infra/typeorm/entities/User'

interface IRequest {
  userId: string
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ userId }: IRequest): Promise<User[]> {
    let providers = await this.cacheProvider.recover<User[]>(`providers-list:${userId}`)

    if (!providers) {
      providers = await this.repository.findAllProviders({ exceptUserId: userId })

      await this.cacheProvider.save(`providers-list:${userId}`, providers)
    }

    return providers
  }
}

export default ListProviderService
