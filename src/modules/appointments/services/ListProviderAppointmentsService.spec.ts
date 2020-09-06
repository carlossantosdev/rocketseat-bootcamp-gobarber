import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'

let fakeAppointmentRepository: FakeAppointmentsRepository
let listProviderAppointments: ListProviderAppointmentsService

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository()
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentRepository
    )
  })

  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 4, 20, 14, 0, 0)
    })

    const appointment2 = await fakeAppointmentRepository.create({
      providerId: 'provider-id',
      userId: 'user-id',
      date: new Date(2020, 4, 20, 15, 0, 0)
    })

    const availability = await listProviderAppointments.execute({
      providerId: 'provider-id',
      day: 20,
      month: 5,
      year: 2020
    })

    expect(availability).toEqual([
      appointment1,
      appointment2
    ])
  })
})
