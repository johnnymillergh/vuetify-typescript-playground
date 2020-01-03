const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')

// All requests using this instance will have a 2 seconds delay:
const mock = new MockAdapter(axios, { delayResponse: 2000 })

// Mock GET request to /users when param `searchText` is 'John'
// arguments for reply are (status, data, headers)
mock.onGet('/api/getDemo').reply(200, {
  message: '/api/getDemo success!'
})

mock.onGet('/api/delay').reply(200, {
  message: 'delay message'
})
