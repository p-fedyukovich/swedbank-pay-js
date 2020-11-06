import PayExAPI from './api'
import PaymentResource from './resources/payment'
import InstrumentResource from './resources/instrument'

class PayEx {
  private readonly _payments: PaymentResource
  private readonly _instruments: InstrumentResource

  constructor(token: string) {
    const payExAPI = new PayExAPI(token)

    this._payments = new PaymentResource(payExAPI)
    this._instruments = new InstrumentResource(payExAPI)
  }

  get payments(): PaymentResource {
    return this._payments
  }

  get instruments(): InstrumentResource {
    return this._instruments
  }
}

export = PayEx
