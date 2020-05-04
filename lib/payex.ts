import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { Payment } from './resources/payment'

// TODO update user agent
const USER_AGENT = 'urbaninfrastructure'

class Payex {
  private static readonly DEFAULT_HOST: string = 'api.payex.com'
  private static readonly DEFAULT_TEST_HOST: string = 'api.externalintegration.payex.com'
  private static readonly DEFAULT_BASE_PATH: string = '/psp/'

  private readonly _client: AxiosInstance

  private _payment: Payment | null = null

  constructor(token: string) {
    const host: string =
      process.env.NODE_ENV === 'production' ? Payex.DEFAULT_HOST : Payex.DEFAULT_TEST_HOST
    const baseURL = `https://${host}${Payex.DEFAULT_BASE_PATH}`

    const config: AxiosRequestConfig = {
      baseURL,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    this._client = axios.create(config)
  }

  get payment(): Payment {
    if (!this._payment) {
      this._payment = new Payment(this._client)
    }
    return this._payment
  }
}

export = Payex
