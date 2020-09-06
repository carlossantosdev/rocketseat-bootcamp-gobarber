import { getMongoRepository, MongoRepository } from 'typeorm'

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO'

import Notification from '../schemas/Notification'

class NotificationRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo')
  }

  public async create({ recipientId, content }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      recipientId,
      content
    })

    await this.ormRepository.save(notification)

    return notification
  }
}

export default NotificationRepository