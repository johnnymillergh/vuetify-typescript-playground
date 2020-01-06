import * as Axios from '@/plugins/axios'
// eslint-disable-next-line no-unused-vars
import { GetDemoPayload } from '@/requests/vuetify-demo/payload/get-demo-payload'

export const vuetifyDemoApi = {
  getDemo: (getDemoPayload: GetDemoPayload) => Axios.get('/api/getDemo', getDemoPayload),
  cancelRequestTest: () => Axios.get('/api/cancel-request-test')
}
