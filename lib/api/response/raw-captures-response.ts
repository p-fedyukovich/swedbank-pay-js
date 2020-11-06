import RawCommonPaymentResponse from './raw-common-payment-response'
import { RawTransaction } from './raw-transactions-response'

export interface RawCapture {
  id: string
  transaction: RawTransaction
}

export default interface RawCapturesResponse extends RawCommonPaymentResponse {
  captures: {
    id: string
    captureList: RawCapture[]
  }
}
