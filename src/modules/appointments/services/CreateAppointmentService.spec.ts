import AppError from '@shared/errors/AppError'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from './CreateAppointmentService'

let fakeAppointmentRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository()
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository)
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      providerId: 'w4234243'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.providerId).toBe('w4234243')
  })

  it('should not be able to create two appointments on the same date and hour', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11)

    await createAppointment.execute({
      date: appointmentDate,
      providerId: 'w4234243'
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        providerId: 'w4234243'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})