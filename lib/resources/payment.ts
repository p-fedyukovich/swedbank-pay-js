import { AbstractResource } from './abstract'
import Payment from '../models/payment'
import PurchaseBody from '../api/request/purchase-body'
import RecurBody from '../api/request/recur-body'
import VerificationBody from '../api/request/verification-body'

export default class PaymentResource extends AbstractResource {
  async create(data: PurchaseBody | RecurBody | VerificationBody): Promise<Payment> {
    const rawPayment = await this._api.createPayment({ payment: data })

    return Payment.generate(this._api, rawPayment)
  }

  async retrieve(paymentId: string): Promise<Payment> {
    const rawPayment = await this._api.getPayment(paymentId)

    return Payment.generate(this._api, rawPayment)
  }
}
