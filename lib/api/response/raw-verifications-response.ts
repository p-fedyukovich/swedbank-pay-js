import RawCommonPaymentResponse from './raw-common-payment-response'
import { RawTransaction } from './raw-transactions-response'

export interface RawVerification {
  id: string
  direct: boolean
  cardBrand: string
  cardType: string
  issuingBank: string
  maskedPan: string
  expiryDate: string
  panToken: string
  panEnrolled: boolean
  authenticationStatus?: string
  acquirerTransactionType?: string
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

export default interface RawVerificationsResponse extends RawCommonPaymentResponse {
  verifications: {
    id: string
    verificationList: RawVerification[]
  }
}
