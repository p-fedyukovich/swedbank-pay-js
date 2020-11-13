import RawCommonPaymentResponse from './raw-common-payment-response'

export interface RawTransaction {
  id: string
  created: string
  updated: string
  type: 'Capture' | 'Authorization' | 'Verification' | 'Reversal'
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
    | 'REJECTED_BY_ACQUIRER_CARD_BLACKLISTED'
    | 'REJECTED_BY_ACQUIRER'
    | 'ACQUIRER_HOST_OFFLINE'
  failedErrorDescription?: string
  problem?: any
  operations: Array<{
    href: string
    rel: string
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
    contentType: string
  }>
}

export default interface RawTransactionsResponse extends RawCommonPaymentResponse {
  transactions: {
    id: string
    transactionList: RawTransaction[]
  }
}
