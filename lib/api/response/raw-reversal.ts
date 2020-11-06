import { RawTransaction } from './raw-transactions-response'

export default interface RawReversal {
  id: string
  transaction: RawTransaction
}
