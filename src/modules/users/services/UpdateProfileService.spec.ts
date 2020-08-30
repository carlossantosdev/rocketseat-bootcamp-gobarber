import AppError from '@shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateProfileService from './UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider

let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'John Trê',
      email: 'johntre@example.com'
    })

    expect(updatedUser.name).toBe('John Trê')
    expect(updatedUser.email).toBe('johntre@example.com')
  })

  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        userId: 'wrong-id',
        name: 'John doe',
        email: 'johndoe@example.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      password: '123456',
      email: 'johndoe@example.com'
    })

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'test@example.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      oldPassword: '123456',
      password: '123123'
    })

    expect(updatedUser.password).toBe('123123')
  })

  it('should not be able to update the password with out old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
