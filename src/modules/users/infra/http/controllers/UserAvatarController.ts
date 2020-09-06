import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { filename: avatarFileName } = request.file

    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

    const user = await updateUserAvatar.execute({
      avatarFileName,
      userId: request.user.id
    })

    return response.json(classToClass(user))
  }
}
