import RawCommonPaymentResponse from './raw-common-payment-response'
import { RawTransaction } from './raw-transactions-response'
import RawCardBrand from './raw-card-brand'

export interface RawAuthorization {
  id: string
  cardBrand: RawCardBrand
  cardType: string
  maskedPan: string
  expiryDate: string
  panToken: string
  panEnrolled: boolean
  acquirerTransactionType: string
  recurrenceToken?: string
  paymentToken?: string
  issuerAuthorizationApprovalCode?: string
  acquirerStan?: string
  acquirerTerminalId?: string
  acquirerTransactionTime?: string
  nonPaymentToken?: string
  transactionInitiator?: string
  transaction: RawTransaction
}

export default interface RawAuthorizationsResponse extends RawCommonPaymentResponse {
  authorizations: {
    id: string
    authorizationList: RawAuthorization[]
  }
}
