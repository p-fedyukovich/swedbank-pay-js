export default interface RawInstrumentResponse {
  instrumentData: {
    cardBrand:
      | 'Visa'
      | 'MasterCard'
      | 'Amex'
      | 'Dankort'
      | 'Diners'
      | 'Finax'
      | 'Jcb'
      | 'IkanoFinansDK'
      | 'Maestro'
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
