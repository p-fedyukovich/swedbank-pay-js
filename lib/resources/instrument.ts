import { AbstractResource } from './abstract'
import { AxiosInstance } from 'axios'

export class Instrument {
  readonly brand:
    | 'visa'
    | 'mastercard'
    | 'amex'
    | 'dankort'
    | 'diners'
    | 'finax'
    | 'jcb'
    | 'ikanofinansdk'
    | 'maestro'
  readonly displayBrand:
    | 'Visa'
    | 'MasterCard'
    | 'Amex'
    | 'Dankort'
    | 'Diners'
    | 'Finax'
    | 'Jcb'
    | 'IkanoFinansDK'
    | 'Maestro'
  readonly maskedPan: string
  readonly last4: string
  readonly expiryDate: string
  readonly expMonth: number
  readonly expYear: number
  readonly paymentToken: string
  readonly id: string
  readonly payeeId: string
  readonly isPayeeToken: boolean
  readonly isDeleted: boolean
  readonly tokenType: 'RecurrenceToken' | 'PaymentToken'

  constructor(rawInstrument: any) {
    this.brand = rawInstrument.cardBrand.toLowerCase()
    this.displayBrand = rawInstrument.cardBrand
    this.maskedPan = rawInstrument.maskedPan
    this.last4 = this.maskedPan.slice(this.maskedPan.length - 4)
    this.expiryDate = rawInstrument.expiryDate
    const [expMonth, expYear] = this.expiryDate.split('/')
    this.expMonth = Number(expMonth)
    this.expYear = Number(expYear)
    this.paymentToken = rawInstrument.paymentToken
    this.id = rawInstrument.id
    this.payeeId = rawInstrument.payeeId
    this.isPayeeToken = rawInstrument.isPayeeToken
    this.isDeleted = rawInstrument.isDeleted
    this.tokenType = rawInstrument.tokenType
  }
}

interface InstrumentResponse {
  instrumentData: Instrument
}

export class InstrumentResource extends AbstractResource {
  constructor(client: AxiosInstance) {
    super(client)
  }

  private static readonly RESOURCE = '/psp/creditcard/payments/instrumentData'

  async retrieveInstrument(token: string): Promise<InstrumentResponse> {
    const response = await this._client.get<InstrumentResponse>(
      `${InstrumentResource.RESOURCE}/${token}`
    )

    return {
      instrumentData: new Instrument(response.data.instrumentData)
    }
  }

  async remove(
    token: string,
    tokenType?: 'RecurrenceToken' | 'PaymentToken',
    comment?: string
  ): Promise<InstrumentResponse> {
    let type = tokenType
    if (!type) {
      const instrumentResponse = await this.retrieveInstrument(token)
      type = instrumentResponse.instrumentData.tokenType
    }

    const response = await this._client.patch<InstrumentResponse>(
      `${InstrumentResource.RESOURCE}/${token}`,
      {
        state: 'Deleted',
        tokenType: type,
        comment: comment || 'No comment'
      }
    )

    return response.data
  }
}
