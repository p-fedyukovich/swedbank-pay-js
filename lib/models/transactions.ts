import RawTransactionsResponse from '../api/response/raw-transactions-response'
import Transaction from './transaction'

export default class Transactions {
  private readonly _raw: RawTransactionsResponse
  private readonly _paymentId: string
  private readonly _id: string
  private readonly _transactionList: Transaction[]

  private constructor(raw: RawTransactionsResponse) {
    this._raw = raw
    this._paymentId = raw.payment.id
    this._id = raw.transactions.id
    this._transactionList = raw.transactions.transactionList.map(Transaction.generate)
  }

  get raw(): RawTransactionsResponse {
    return this._raw
  }

  get paymentId(): string {
    return this._paymentId
  }

  get id(): string {
    return this._id
  }

  get transactionList(): Transaction[] {
    return this._transactionList
  }

  static generate(raw: RawTransactionsResponse): Transactions {
    return new Transactions(raw)
  }
}
