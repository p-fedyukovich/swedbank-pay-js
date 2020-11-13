import RawCommonPaymentResponse from './raw-common-payment-response'
import RawReversal from './raw-reversal'

export default interface RawReversalsResponse extends RawCommonPaymentResponse {
  reversals: {
    id: string
    reversalList: RawReversal[]
  }
}
