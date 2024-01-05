import type { HttpMethod } from '@ninepielabs/constants'

export type THeaders = Record<string, any>
export type TData = Record<string, any>
export type TParams = Record<string, any>

export interface RequestConfig {
  method: HttpMethod
  url: string
  headers?: THeaders
  data?: TData
  params?: TParams
}
