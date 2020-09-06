import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderDayAvaibilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params
    const { day, month, year } = request.body

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvaibilityService
    )

    const availability = await listProviderDayAvailability.execute({
      providerId,
      day,
      month,
      year
    })

    return response.json(availability)
  }
}
