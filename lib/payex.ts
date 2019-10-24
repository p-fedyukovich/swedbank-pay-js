import { BearerCredentialHandler } from 'typed-rest-client/Handlers'
import * as rm from 'typed-rest-client/RestClient'
import { RestClient } from 'typed-rest-client/RestClient'
import { Payment } from './payment'

const BASE_URL = 'api.payex.com'
const USER_AGENT = 'urbaninfrastructure'

class Payex {
    private readonly _client: RestClient
    private readonly _payment: Payment
    constructor(token: string) {
        const bearerCredentialHandler: BearerCredentialHandler = new BearerCredentialHandler(token)
        this._client = new rm.RestClient(USER_AGENT, BASE_URL, [
            bearerCredentialHandler
        ])

        this._payment = new Payment(this._client)
    }

    get payment(): Payment {
        return this._payment;
    }
}

export default function client(token: string) {
    return new Payex(token)
}
