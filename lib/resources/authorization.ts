import { Transaction } from './transaction'
import { AbstractResource } from './abstract'
import { AxiosInstance } from 'axios'

export interface Authorization {
  direct: boolean
  cardBrand: string
  cardType: string
  paymentToken: string
  recurrenceToken: string
  maskedPan: string
  expiryDate: string
  panToken: string
  panEnrolled: boolean
  issuerAuthorizationApprovalCode: string
  acquirerTransactionType: string
  acquirerStan: string
  acquirerTerminalId: string
  acquirerTransactionTime: string
  nonPaymentToken: string
  transactionInitiator: string
  id: string
  transaction: Transaction
}

export interface AuthorizationsResponse {
  payment: string
  authorizations: {
    id: string
    authorizationList: Authorization[]
  }
}

export interface AuthorizationResponse {
  payment: string
  authorization: Authorization
}

export class AuthorizationResource extends AbstractResource {
  constructor(client: AxiosInstance) {
    super(client)
  }

  async retrieveList(paymentId: string) {
    const response = await this._client.get<AuthorizationsResponse>(`${paymentId}/authorizations`)
    return response.data
  }

  async retrieve(authorizationId: string): Promise<AuthorizationResponse> {
    const response = await this._client.get<AuthorizationResponse>(authorizationId)
    return response.data
  }
}
