import { AxiosInstance } from 'axios'

import { AbstractResource } from './abstract'
import { Transaction } from './transaction'

export interface Reversal {
  id: string
  transaction: Transaction
}

export interface ReversalResponse {
  payment: string
  reversal: Reversal
}

export class ReversalResource extends AbstractResource {
  constructor(client: AxiosInstance) {
    super(client)
  }

  async retrieve(reversalId: string): Promise<ReversalResponse> {
    const response = await this._client.get<ReversalResponse>(reversalId)
    return response.data
  }
}
