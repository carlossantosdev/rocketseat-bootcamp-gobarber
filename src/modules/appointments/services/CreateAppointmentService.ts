import { startOfHour } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  providerId: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private repository: IAppointmentRepository
  ) {}

  public async execute({ date, providerId }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await this.repository.findByDate(
      appointmentDate
    )

    if (findAppointmentInSameDate)
      throw new AppError('This appointment is already booked.')

    const appointment = await this.repository.create({
      providerId,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
