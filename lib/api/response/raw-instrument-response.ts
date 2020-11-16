import RawCardBrand from './raw-card-brand'

export default interface RawInstrumentResponse {
  instrumentData: {
    cardBrand: RawCardBrand
    maskedPan: string
    expiryDate: string
    paymentToken: string
    id: string
    payeeId: string
    isPayeeToken: boolean
    isDeleted: boolean
    tokenType: 'RecurrenceToken' | 'PaymentToken'
  }
}
