import * as Axios from '@/plugins/axios'
/* eslint-disable no-unused-vars */
import { GetDemoPayload } from '@/requests/vuetify-demo/payload/get-demo-payload'
import { CancelRequestTestPayload } from '@/requests/vuetify-demo/payload/cancel-request-test-payload'

export const vuetifyDemoApi = {
  getDemo: (getDemoPayload: GetDemoPayload) => Axios.get('/api/getDemo', getDemoPayload),
  cancelRequestTest: (cancelRequestTestPayload: CancelRequestTestPayload) => Axios.get('/api/cancel-request-test', cancelRequestTestPayload)
}
