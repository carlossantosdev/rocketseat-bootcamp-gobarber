import { ObjectId } from 'mongodb'

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO'

import Notification from '../../infra/typeorm/schemas/Notification'

class NotificationRepository implements INotificationsRepository {
  private notifications: Notification[] = []

  public async create({ recipientId, content }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification()

    Object.assign(notification, { id: new ObjectId(), recipientId, content })

    this.notifications.push(notification)

    return notification
  }
}

export default NotificationRepository