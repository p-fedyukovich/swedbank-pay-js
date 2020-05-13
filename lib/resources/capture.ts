import { AbstractResource } from './abstract'
import { AxiosInstance } from 'axios'

export interface Capture {
  id: string
  created: string
  updated: string
  type: 'Capture'
  state: 'Completed'
  number: number
  amount: number
  vatAmount: number
  description: string
  payeeReference: string
  isOperational: boolean
}

export class CaptureResource extends AbstractResource {
  constructor(client: AxiosInstance) {
    super(client)
  }

  async retrieve(captureId: string) {
    const response = await this._client.get<Capture>(captureId)
    return response.data
  }
}
