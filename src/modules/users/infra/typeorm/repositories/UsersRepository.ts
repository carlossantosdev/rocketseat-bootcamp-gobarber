import { getRepository, Repository, Not } from 'typeorm'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'

import User from '../entities/User'

class UserRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } })
  }

  public async findAllProviders({
    exceptUserId
  }: IFindAllProvidersDTO): Promise<User[]> {
    let users

    if (exceptUserId) {
      users = await this.ormRepository.find({
        where: {
          id: Not(exceptUserId)
        }
      })
    } else {
      users = await this.ormRepository.find()
    }

    return users
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)
    await this.ormRepository.save(user)
    return user
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}

export default UserRepository
