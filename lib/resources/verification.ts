import { AbstractResource } from './abstract'
import { Authorization } from './authorization'
import { AxiosInstance } from 'axios'

export interface VerificationResponse {
  payment: string
  verification: Authorization
}

export class VerificationResource extends AbstractResource {
  constructor(client: AxiosInstance) {
    super(client)
  }

  async retrieve(verificationId: string): Promise<VerificationResponse> {
    const response = await this._client.get<VerificationResponse>(verificationId)
    return response.data
  }
}
