import RawReversal from '../api/response/raw-reversal'
import Transaction from './transaction'

export class Reversal {
  private readonly _id: string
  private readonly _transaction: Transaction

  private constructor(raw: RawReversal) {
    this._id = raw.id
    this._transaction = Transaction.generate(raw.transaction)
  }

  get id(): string {
    return this._id
  }

  get transaction(): Transaction {
    return this._transaction
  }

  static generate(raw: RawReversal): Reversal {
    return new Reversal(raw)
  }
}
