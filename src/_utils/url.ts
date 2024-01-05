import type { TParams } from '../types'

export function getQueryString(params: TParams = {}): string {
  return Object.keys(params)
    .reduce((arr: string[], key: string) => {
      if (params[key] !== undefined) {
        return arr.concat(`${key}=${encodeURIComponent(params[key])}`)
      }
      return arr
    }, [])
    .join('&')
}

export function buildUrl(url: string, params: object = {}): string {
  const queryString = getQueryString(params)
  return `${url}${queryString && '?' + queryString}`
}
