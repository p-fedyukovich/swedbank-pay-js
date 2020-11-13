import axios, { AxiosInstance, Method } from 'axios'
import axiosRetry from 'axios-retry'

import RawPayeeInfoResponse from './response/raw-payee-info-response'
import RawPricesResponse from './response/raw-prices-response'
import RawUrlsResponse from './response/raw-urls-response'
import RawMetadataResponse from './response/raw-metadata-response'
import RawTransactionsResponse from './response/raw-transactions-response'
import RawAuthorizationsResponse from './response/raw-authorizations-response'
import RawCapturesResponse from './response/raw-captures-response'
import RawReversalsResponse from './response/raw-reversals-response'
import RawVerificationsResponse from './response/raw-verifications-response'
import RawPaymentResponse from './response/raw-payment-response'
import SwedbankPayError from '../error'
import CreatePaymentRequest from './request/create-payment-request'
import CreateReversalRequest from './request/create-reversal-request'
import RawReversalResponse from './response/raw-reversal-response'
import RawPaidPaymentResponse from './response/raw-paid-payment-response'
import RawInstrumentResponse from './response/raw-instrument-response'

export default class SwedbankPayAPI {
  static readonly DEFAULT_HOST: string = 'api.payex.com'
  static readonly DEFAULT_TEST_HOST: string = 'api.externalintegration.payex.com'

  private readonly _client: AxiosInstance
  private readonly _baseURL: string

  constructor(token: string) {
    const host: string =
      process.env.NODE_ENV === 'production'
        ? SwedbankPayAPI.DEFAULT_HOST
        : SwedbankPayAPI.DEFAULT_TEST_HOST

    this._baseURL = `https://${host}`
    this._client = axios.create({
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    axiosRetry(this._client, { retryDelay: axiosRetry.exponentialDelay , retries: 5})
  }

  private async request<T>(method: Method, url?: string, data?: any): Promise<T> {
    try {
      const res = await this._client.request<T>({
        method,
        url,
        data
      })
      return res.data
    } catch (error) {
      if (error.response) {
        const { headers, data } = error.response

        throw SwedbankPayError.generate({
          ...data,
          headers
        })
      }

      throw SwedbankPayError.generate(error)
    }
  }

  private get<T>(url: string): Promise<T> {
    return this.request<T>('GET', url)
  }

  private post<T>(url: string, data: any): Promise<T> {
    return this.request<T>('POST', url, data)
  }

  private patch<T>(url: string, data: any): Promise<T> {
    return this.request<T>('PATCH', url, data)
  }

  getPayment(paymentId: string): Promise<RawPaymentResponse> {
    return this.get<RawPaymentResponse>(paymentId)
  }

  getRawPrices(pricesId: string): Promise<RawPricesResponse> {
    return this.get<RawPricesResponse>(pricesId)
  }

  getRawUrls(urlsId: string): Promise<RawUrlsResponse> {
    return this.get<RawUrlsResponse>(urlsId)
  }

  getRawPayeeInfo(payeeInfoId: string): Promise<RawPayeeInfoResponse> {
    return this.get<RawPayeeInfoResponse>(payeeInfoId)
  }

  getMetadata(metadataId: string): Promise<RawMetadataResponse> {
    return this.get<RawMetadataResponse>(metadataId)
  }

  getTransactions(transactionsId: string): Promise<RawTransactionsResponse> {
    return this.get<RawTransactionsResponse>(transactionsId)
  }

  getAuthorizations(authorizationsId: string): Promise<RawAuthorizationsResponse> {
    return this.get<RawAuthorizationsResponse>(authorizationsId)
  }

  getCaptures(capturesId: string): Promise<RawCapturesResponse> {
    return this.get<RawCapturesResponse>(capturesId)
  }

  getReversals(reversalsId: string): Promise<RawReversalsResponse> {
    return this.get<RawReversalsResponse>(reversalsId)
  }

  getVerifications(verificationsId: string): Promise<RawVerificationsResponse> {
    return this.get<RawVerificationsResponse>(verificationsId)
  }

  getPaidPayment(url: string, method: Method): Promise<RawPaidPaymentResponse> {
    return this.request<RawPaidPaymentResponse>(method, url)
  }

  createPayment(data: CreatePaymentRequest): Promise<RawPaymentResponse> {
    return this.post<RawPaymentResponse>(`${this._baseURL}/psp/creditcard/payments`, data)
  }

  createReversal(
    url: string,
    method: Method,
    data: CreateReversalRequest
  ): Promise<RawReversalResponse> {
    return this.request<RawReversalResponse>(method, url, data)
  }

  getInstrument(token: string): Promise<RawInstrumentResponse> {
    return this.get<RawInstrumentResponse>(
      `${this._baseURL}/psp/creditcard/payments/instrumentdata/${token}`
    )
  }

  removeInstrument(
    token: string,
    tokenType: 'RecurrenceToken' | 'PaymentToken',
    comment?: string
  ): Promise<RawInstrumentResponse> {
    return this.patch<RawInstrumentResponse>(
      `${this._baseURL}/psp/creditcard/payments/instrumentdata/${token}`,
      {
        state: 'Deleted',
        tokenType,
        comment: comment || 'No comment'
      }
    )
  }
}
