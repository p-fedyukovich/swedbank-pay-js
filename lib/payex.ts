import axios, { AxiosInstance } from 'axios'
import { PaymentResource } from './resources/payment'
import { CaptureResource } from './resources/capture'
import { AuthorizationResource } from './resources/authorization'
import { InstrumentResource } from './resources/instrument'
import { TransactionResource } from './resources/transaction'
import { VerificationResource } from './resources/verification'
import { ReversalResource } from './resources/reversal'

// TODO update user agent
const USER_AGENT = 'urbaninfrastructure'

class Payex {
  static readonly DEFAULT_HOST: string = 'api.payex.com'
  static readonly DEFAULT_TEST_HOST: string = 'api.externalintegration.payex.com'

  private readonly _client: AxiosInstance

  private readonly _payments: PaymentResource
  private readonly _captures: CaptureResource
  private readonly _authorizations: AuthorizationResource
  private readonly _instruments: InstrumentResource
  private readonly _transactions: TransactionResource
  private readonly _verifications: VerificationResource
  private readonly _reversals: ReversalResource

  constructor(token: string) {
    const host: string =
      process.env.NODE_ENV === 'production' ? Payex.DEFAULT_HOST : Payex.DEFAULT_TEST_HOST

    this._client = axios.create({
      baseURL: `https://${host}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    this._payments = new PaymentResource(this._client)
    this._captures = new CaptureResource(this._client)
    this._authorizations = new AuthorizationResource(this._client)
    this._instruments = new InstrumentResource(this._client)
    this._transactions = new TransactionResource(this._client)
    this._verifications = new VerificationResource(this._client)
    this._reversals = new ReversalResource(this._client)
  }

  get payments(): PaymentResource {
    return this._payments
  }

  get captures(): CaptureResource {
    return this._captures
  }

  get authorizations(): AuthorizationResource {
    return this._authorizations
  }

  get instruments(): InstrumentResource {
    return this._instruments
  }

  get transactions(): TransactionResource {
    return this._transactions
  }

  get verifications(): VerificationResource {
    return this._verifications
  }

  get reversals(): ReversalResource {
    return this._reversals
  }
}

export = Payex
