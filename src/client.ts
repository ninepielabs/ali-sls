import SLSClient, { type ClientOpts } from './models/SLSClient'

const cacheClient = (client: SLSClient) => {
  globalThis.__NINEPIELABS_SLS_CLIENT__ = client
}

const cacheClientConfig = (opts: ClientOpts) => {
  globalThis.__NINEPIELABS_SLS_CLIENT_OPTIONS__ = opts
}

const createClient = (opts: ClientOpts) => {
  if (!opts) {
    throw new Error('SLSClient config is not provided')
  }
  cacheClientConfig(opts)
  const client = new SLSClient(opts)
  cacheClient(client)
  return client
}

export const initClient = (opts: ClientOpts) => {
  return createClient(opts)
}

declare global {
  /* eslint-disable */
  var __NINEPIELABS_SLS_CLIENT__: SLSClient

  var __NINEPIELABS_SLS_CLIENT_OPTIONS__: ClientOpts
}
const client =
  globalThis.__NINEPIELABS_SLS_CLIENT__ ||
  createClient(globalThis.__NINEPIELABS_SLS_CLIENT_OPTIONS__)

export default client
