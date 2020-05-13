import { AbstractResource } from './abstract'
import { AxiosInstance } from 'axios'

export interface TransactionResponse {
  payment: string
  transaction: Transaction
}

export interface Transaction {
  id: string
  created: string
  updated: string
  type: 'Capture' | 'Authorization' | 'Verification'
  state: 'Completed' | 'Failed'
  number: number
  amount: number
  vatAmount: number
  description: string
  payeeReference: string
  isOperational: boolean
  failedReason?: string
  failedActivityName?: string
  failedErrorCode?:
    | 'REJECTED_BY_ACQUIRER_INVALID_AMOUNT'
    | 'REJECTED_BY_ACQUIRER_FORMAT_ERROR'
    | 'REJECTED_BY_ACQUIRER_POSSIBLE_FRAUD'
    | 'REJECTED_BY_ACQUIRER_CARD_STOLEN'
    | 'REJECTED_BY_ACQUIRER_CARD_EXPIRED'
    | 'REJECTED_BY_ACQUIRER_INSUFFICIENT_FUNDS'
    | 'REJECTED_BY_ACQUIRER'
    | 'ACQUIRER_HOST_OFFLINE'
  failedErrorDescription?: string
}

export class TransactionResource extends AbstractResource {
  constructor(client: AxiosInstance) {
    super(client)
  }

  async retrieve(transactionId: string): Promise<TransactionResponse> {
    const response = await this._client.get<TransactionResponse>(transactionId)
    return response.data
  }
}
