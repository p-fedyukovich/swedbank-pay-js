export default interface RawPaidPaymentResponse {
  payment: string
  paid: {
    tokens: Array<{
      type: 'recurrence' | 'payment'
      token: string
      name: string
      expiryDate: string
    }>
    detail: {
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
      cardType: string
      issuingBank: string
      countryCode: string
      issuerAuthorizationApprovalCode: string
      acquirerTransactionType: string
      acquirerStan: string
      acquirerTerminalId: string
      acquirerTransactionTime: string
      nonPaymentToken: string
      transactionInitiator: string
    }
    id: string
    number: number
    transaction: {
      id: string
      number: number
    }
    payeeReference: string
    amount: number
    orderReference?: string
  }
}
