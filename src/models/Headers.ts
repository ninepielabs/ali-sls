import type { THeaders } from '../types'

class Headers {
  private _value: THeaders = {}
  private readonly _defaultValue: THeaders = {}

  constructor(defaultValue: THeaders) {
    this._value = { ...defaultValue }
    this._defaultValue = { ...defaultValue }
  }

  getX() {
    const xKeys = Object.keys(this._value).filter(
      (key) => key.startsWith('x-log-') || key.startsWith('x-acs-')
    )
    return xKeys.reduce<THeaders>((acc, key) => {
      return { ...acc, [key]: this._value[key] }
    }, {})
  }

  get(key: string) {
    return this._value[key]
  }

  set(key: string, value: any) {
    this._value[key] = value
  }

  reset() {
    this._value = { ...this._defaultValue }
  }

  get values() {
    return this._value
  }
}

export default Headers
