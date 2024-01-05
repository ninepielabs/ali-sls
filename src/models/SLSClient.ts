import cryptoJs from 'crypto-js'
import { HttpMethod } from '@ninepielabs/constants'
import Request from '../models/Request'
import type { RequestConfig } from '../types'
import { buildUrl } from '../_utils/url'

export interface ClientOpts {
  endpoint: string
  project: string
  accessKeyId: string
  accessKeySecret: string
}

type MethodRequestConfig = Pick<RequestConfig, 'data' | 'params'>

class SLSClient extends Request {
  private readonly opts: ClientOpts

  constructor(opts: ClientOpts) {
    const baseURL = `https://${opts.project}.${opts.endpoint}`
    super({ baseURL })
    this.opts = opts
  }

  get<T = any>(url: string, config: MethodRequestConfig) {
    return this.request<T>({
      method: HttpMethod.GET,
      url,
      ...config,
    })
  }

  post<T = any>(url: string, config: MethodRequestConfig) {
    return this.request<T>({
      method: HttpMethod.POST,
      url,
      ...config,
    })
  }

  protected request<T = any>(config: RequestConfig) {
    this._resetHeaders()
    this._setDynamicHeaders(config)
    return super.request<T>(config)
  }

  private _resetHeaders() {
    this.headers.reset()
  }

  private _setDynamicHeaders(config: RequestConfig) {
    const { method, url, data, params } = config

    // Date
    const date = new Date().toUTCString()
    this.headers.set('Date', date)

    // Content-MD5
    // Content-Length
    const body = data ? JSON.stringify(data) : ''

    if (body) {
      this.headers.set('Content-MD5', cryptoJs.MD5(body).toString(cryptoJs.enc.Hex).toUpperCase())
    }
    this.headers.set('Content-Length', body.length.toString())

    // Authorization
    this.headers.set('Authorization', this._getAuthorization(method, buildUrl(url, params)))
  }

  private _getAuthorization(method: HttpMethod, url: string) {
    const message = [
      method,
      this.headers.get('Content-MD5') || '',
      this.headers.get('Content-Type') || '',
      this.headers.get('Date') || '',
      ...Object.keys(this.headers.getX())
        .sort()
        .map((key) => `${key}:${this.headers.get(key)}`),
      url,
    ].join('\n')

    const { accessKeyId, accessKeySecret } = this.opts

    const token = cryptoJs.HmacSHA1(message, accessKeySecret).toString(cryptoJs.enc.Base64)

    return `LOG ${accessKeyId}:${token}`
  }
}

export default SLSClient
