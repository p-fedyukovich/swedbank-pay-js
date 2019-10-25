import { BearerCredentialHandler } from 'typed-rest-client/Handlers'
import { IRequestOptions } from 'typed-rest-client/Interfaces'
import { RestClient } from 'typed-rest-client/RestClient'
import { Payment } from './payment'

// TODO update user agent
const USER_AGENT = 'urbaninfrastructure'

class Payex {
    private static readonly DEFAULT_HOST: string = 'api.payex.com'
    private static readonly DEFAULT_TEST_HOST: string = 'api.externalintegration.payex.com'
    private static readonly DEFAULT_BASE_PATH: string = '/psp/'

    private readonly _client: RestClient

    private _payment: Payment | null = null

    constructor(token: string, requestOptions?: IRequestOptions) {
        const host: string = process.env.NODE_ENV === 'production' ? Payex.DEFAULT_HOST : Payex.DEFAULT_TEST_HOST
        const baseUrl: string = `https://${host}${Payex.DEFAULT_BASE_PATH}`

        const bearerCredentialHandler: BearerCredentialHandler = new BearerCredentialHandler(token)
        const handlers = [bearerCredentialHandler]

        this._client = new RestClient(USER_AGENT, baseUrl, handlers, requestOptions)
    }

    get payment(): Payment {
        if(!this._payment) {
            this._payment = new Payment(this._client)
        }
        return this._payment
    }
}

export = Payex
