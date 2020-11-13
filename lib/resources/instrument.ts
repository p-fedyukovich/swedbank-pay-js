import { AbstractResource } from './abstract'
import Instrument from '../models/instrument'

export default class InstrumentResource extends AbstractResource {
  async retrieve(token: string): Promise<Instrument> {
    const rawInstrumentResponse = await this._api.getInstrument(token)

    return Instrument.generate(rawInstrumentResponse)
  }

  async remove(
    token: string,
    tokenType?: 'RecurrenceToken' | 'PaymentToken',
    comment?: string
  ): Promise<Instrument> {
    let type = tokenType
    if (!type) {
      const instrument = await this.retrieve(token)
      type = instrument.tokenType
    }

    const rawInstrumentResponse = await this._api.removeInstrument(token, type, comment)
    return Instrument.generate(rawInstrumentResponse)
  }
}
