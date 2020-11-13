import RawCommonPaymentResponse from './raw-common-payment-response'

export default interface RawMetadataResponse extends RawCommonPaymentResponse {
  metadata: {
    id: string
    [name: string]: string | number | boolean
  }
}
