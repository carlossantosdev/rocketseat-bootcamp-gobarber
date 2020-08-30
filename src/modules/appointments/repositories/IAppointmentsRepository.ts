import Appointment from '../infra/typeorm/entities/Appointment'
import ICreatedAppointmentDTO from '../dtos/ICreateAppointmentDTO'

export default interface IAppointmentsRepository {
  create(date: ICreatedAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
}
