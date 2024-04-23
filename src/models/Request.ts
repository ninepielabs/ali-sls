import axios, { type AxiosInstance } from 'axios'
import type { RequestConfig } from '../types'
import Headers from './Headers'

const defaultHeaders = {
  'x-log-apiversion': '0.6.0',
  'x-log-signaturemethod': 'hmac-sha1',
  'x-log-bodyrawsize': '0',
  'Content-Type': 'application/json',
}

interface RequestOpts {
  baseURL?: string
}

class Request {
  readonly headers = new Headers(defaultHeaders)
  private readonly instance: AxiosInstance
  constructor(config: RequestOpts = {}) {
    this.instance = axios.create(config)
  }

  protected async request<T = any>(config: RequestConfig) {
    const { url, method, ...restConfig } = config

    const headers = this.headers.values

    return this.instance
      .request<T>({
        url,
        method,
        headers,
        ...restConfig,
      })
      .then((res) => res.data)
      .catch((e) => {
        throw e
      })
  }
}

export default Request
