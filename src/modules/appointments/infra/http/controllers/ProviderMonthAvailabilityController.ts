import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListProviderMonthAvaibilityService from '@modules/appointments/services/ListProviderMonthAvaibilityService'

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvaibilityService
    )
    const providers = await listProviders.execute({ userId })

    return response.json(providers)
  }
}
