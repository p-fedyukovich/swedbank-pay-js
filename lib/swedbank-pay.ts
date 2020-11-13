import SwedbankPayAPI from './api'
import PaymentResource from './resources/payment'
import InstrumentResource from './resources/instrument'

class SwedbankPay {
  private readonly _payments: PaymentResource
  private readonly _instruments: InstrumentResource

  constructor(token: string) {
    const api = new SwedbankPayAPI(token)

    this._payments = new PaymentResource(api)
    this._instruments = new InstrumentResource(api)
  }

  get payments(): PaymentResource {
    return this._payments
  }

  get instruments(): InstrumentResource {
    return this._instruments
  }
}

export = SwedbankPay
