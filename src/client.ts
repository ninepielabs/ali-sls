import Client, { type ClientOpts } from './models/SLSClient'

export const createClient = (opts: ClientOpts) => new Client(opts)

export { Client }
