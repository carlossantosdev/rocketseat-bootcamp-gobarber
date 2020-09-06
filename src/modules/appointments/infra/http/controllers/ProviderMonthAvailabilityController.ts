import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderMonthAvaibilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { providerId } = request.params
    const { month, year } = request.body

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvaibilityService
    )

    const availability = await listProviderMonthAvailability.execute({
      providerId,
      month,
      year
    })

    return response.json(availability)
  }
}
