import { startOfHour, isBefore, getHours, format } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentRepository from '../repositories/IAppointmentsRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'

interface IRequest {
  providerId: string
  userId: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private repository: IAppointmentRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({
    date,
    providerId,
    userId
  }: IRequest): Promise<Appointment> {
    if (providerId === userId) throw new AppError('You can\'t create an appointment with yourself')

    const appointmentDate = startOfHour(date)
    const appointmentHour = getHours(appointmentDate)

    if (appointmentHour < 8 || appointmentHour > 17)
      throw new AppError('Youn can only create appointments between 8am and 5pm')

    if (isBefore(appointmentDate, Date.now())) throw new AppError('You can\'t create an appointment on a past date')

    const findAppointmentInSameDate = await this.repository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate)
      throw new AppError('This appointment is already booked.')

    const appointment = await this.repository.create({
      providerId,
      userId,
      date: appointmentDate
    })

    await this.notificationsRepository.create({
      recipientId: providerId,
      content: `Novo agendamento para o dia ${format(appointmentDate, "dd/MM/YYY 'às' HH:mm'h'")}`
    })

    await this.cacheProvider.invalidatePrefix(
      `provider-appointments:${providerId}:${format(appointmentDate, 'yyyy-M-d')}`
    )

    return appointment
  }
}

export default CreateAppointmentService
