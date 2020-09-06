import { uuid } from 'uuidv4'
import { isEqual, getMonth, getDate, getYear } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreatedAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

import Appointment from '../../infra/typeorm/entities/Appointment'

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    )

    return findAppointment
  }

  public async findAllInMonthFromProvider({
    providerId,
    month,
    year
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.providerId === providerId &&
          getMonth(appointment.date) + 1 === month,
        getYear(appointment.date) === year
      )
    })

    return appointments
  }

  public async findAllInDayFromProvider({
    providerId,
    day,
    month,
    year
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.providerId === providerId &&
          getMonth(appointment.date) === day,
        getMonth(appointment.date) + 1 === month,
        getYear(appointment.date) === year
      )
    })

    return appointments
  }

  public async create({
    providerId,
    userId,
    date
  }: ICreatedAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, {
      id: uuid(),
      date,
      providerId,
      userId
    })

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentsRepository
