# ali-sls

## How to use

```bash
yarn add @ninepielabs/ali-sls
```

```typescript
import { initClient, client } from '@ninepielabs/ali-sls'

initClient({
  endpoint: <your-endpoint>
  project: <your-project>
  accessKeyId: process.env.ALI_ACCESS_KEY_ID
  accessKeySecret: process.enve.ALI_ACCESS_KEY_SECRET
})

client.get('/path/to/', {
  params: {},
  data: {}
})
```
