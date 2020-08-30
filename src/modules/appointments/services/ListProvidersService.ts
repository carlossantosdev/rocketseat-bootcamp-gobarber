import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import User from '@modules/users/infra/typeorm/entities/User'

interface IRequest {
  userId: string
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository
  ) {}

  public async execute({ userId }: IRequest): Promise<User[]> {
    return this.repository.findAllProviders({ exceptUserId: userId })
  }
}

export default ListProviderService
