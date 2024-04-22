import { createClient } from './client'

const client = createClient({
  endpoint: process.env.ALI_ENDPOINT || '',
  project: process.env.ALI_PROJECT || '',
  accessKeyId: process.env.ALI_ACCESS_KEY_ID || '',
  accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET || '',
})

const DEFAULT_VALUE = '-'

interface LogContent {
  [key: string]: any
  /** Unit: s */
  time: number
}

interface LogOption {
  source?: string
  topic?: string
  logs: LogContent[]
  tags?: {
    [key: string]: any
  }
}

export const postLogStoreLogs = (
  logstore: string,
  { logs, source = DEFAULT_VALUE, topic = DEFAULT_VALUE, tags = {} }: LogOption
) => {
  return client.post(`/logstores/${logstore}/shards/lb`, {
    data: {
      __source__: source,
      __topic__: topic,
      __tags__: tags,
      __logs__: logs.map((l) => ({ ...l, __time__: l.time })),
    },
  })
}
