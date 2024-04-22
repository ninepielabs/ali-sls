# ali-sls

Warning: This is a work-in-progress and not the finished product.

## How to use

```bash
yarn add @ninepie/ali-sls
```

```typescript
import { createClient } from '@ninepie/ali-sls'

const client = createClient({
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
