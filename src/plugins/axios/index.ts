/**
 * @author Johnny Miller (鍾俊), e-mail: johnnysviva@outlook.com
 * @date 1/2/20 9:15 AM
 */
// eslint-disable-next-line no-unused-vars
import Axios, { AxiosRequestConfig, Canceler, ResponseType } from 'axios'
import { validate } from 'class-validator'
import { ClassValidationUtil } from '@/utils/class-validation-util'

// 1. Create an axios instance.
export const service = Axios.create({
  // Base URL of API
  baseURL: process.env.VUE_APP_BASE_URL,
  // Request timeout: 30s
  timeout: 30000,
  /**
   * `validateStatus` defines whether to resolve or reject the promise for a given HTTP response status code.
   * The value of status must be less than 999.
   * @param {number} status HTTP's status code
   * @return {boolean} If `validateStatus` returns `true` (or is set to `null` or `undefined`),
   * the promise will be resolved; otherwise, the promise will be rejected.
   */
  validateStatus: status => {
    // Only the HTTP status code is equal to 200, axios would resolve the promise
    return status === 200
  }
})

const CancelToken = Axios.CancelToken
const pendingRequestList: PendingRequest[] = []

/**
 * Pending Request
 * @author Johnny Miller (鍾俊), e-mail: johnnysviva@outlook.com
 * @date 1/6/20 2:26 PM
 */
interface PendingRequest {
  /**
   * Request token.
   *
   * Format: [URL]::[HTTP Method]::[Stringified Request Params]
   *
   * Sample: /api/cancel-request-test::get::undefined
   */
  requestToken: string
  /**
   * Cancel executor
   */
  cancelExecutor: Canceler
}

const cancelAndRemoveSamePendingRequest = (axiosRequestConfig: AxiosRequestConfig): void => {
  pendingRequestList.forEach((pendingRequest, index) => {
    const requestToken = `${axiosRequestConfig?.url?.split('?')[0]}::${axiosRequestConfig.method}::${JSON.stringify(axiosRequestConfig.params)}`
    if (pendingRequest.requestToken === requestToken) {
      // Execute cancellation of this pending request.
      pendingRequest.cancelExecutor(`Cancelled Axios Request. Request token: ${requestToken}`)
      // Remove this pending request from list.
      pendingRequestList.splice(index, 1)
    }
  })
}

// 2. Request interceptor's configuration.
service.interceptors.request.use(
  async axiosRequestConfig => {
    if (axiosRequestConfig?.params) {
      const validation = await validate(axiosRequestConfig.params)
      if (validation.length > 0) {
        console.error('Validation failed! Validation:', validation)
        console.error('Validation failed! Error message:', ClassValidationUtil.getAllValidationError(validation))
        throw new Error(`Validation failed! The 1st error: ${ClassValidationUtil.getFirstValidationError(validation)}`)
      }
    }
    // Cancel and remove same request before sending upcoming request.
    cancelAndRemoveSamePendingRequest(axiosRequestConfig)
    axiosRequestConfig.cancelToken = new CancelToken((cancel: Canceler) => {
      pendingRequestList.push({
        requestToken: `${axiosRequestConfig?.url?.split('?')[0]}::${axiosRequestConfig.method}::${JSON.stringify(axiosRequestConfig.params)}`,
        cancelExecutor: cancel
      })
    })
    return axiosRequestConfig
  },
  error => {
    // Do something with request error
    // for debug
    console.error('[Axios] Error occurred when sending request!', error)
    return Promise.reject(error)
  }
)

// 3. Response interceptor's configuration.
service.interceptors.response.use(
  response => {
    // Only the HTTP status code is equal to 200, axios would resolve the promise
    const resp = response.data
    return Promise.resolve(resp)
  },
  error => {
    console.error('[Axios] Error occurred when handling response!', error)
    console.error('[Axios] Error occurred when handling response! Response:', error.response)
    return Promise.reject(error)
  }
)

// noinspection JSUnusedGlobalSymbols
/**
 * Send a GET request.
 *
 * The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
 *
 * @param url URL
 * @param params Params
 * @param responseType Response type.
 * @return {Promise<any>} Response data.
 * @see <a href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET'>HTTP request methods — GET | MDN</a>
 */
export function get (url: string, params?: any, responseType: ResponseType = 'json'): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    service.get(url, {
      params: params,
      responseType: responseType
    }).then(resp => {
      resolve(resp)
    }).catch(rejectedReason => {
      reject(rejectedReason)
    })
  })
}

// noinspection JSUnusedGlobalSymbols
/**
 * The DELETE method deletes the specified resource.
 *
 * @param url URL.
 * @param params Params.
 * @return {Promise<any>} Response data.
 * @see <a href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE'>HTTP request methods — DELETE | MDN</a>
 */
export function deleteRequest (url: string, params: any): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    service.delete(url, {
      params: params
    }).then(resp => {
      resolve(resp)
    }).catch(rejectedReason => {
      reject(rejectedReason)
    })
  })
}

// noinspection JSUnusedGlobalSymbols
/**
 * The HEAD method asks for a response identical to that of a GET request, but without the response body.
 *
 * The HTTP HEAD method requests the headers that are returned if the specified resource would be requested with an HTTP GET method.
 * Such a request can be done before deciding to download a large resource to save bandwidth, for example.
 *
 * @param url URL.
 * @param params Params.
 * @return {Promise<any>} Response data.
 * @see <a href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD'>HTTP request methods — HEAD | MDN</a>
 */
export function head (url: string, params: any): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    service.head(url, {
      params: params
    }).then(resp => {
      resolve(resp)
    }).catch(rejectedReason => {
      reject(rejectedReason)
    })
  })
}

// noinspection JSUnusedGlobalSymbols
/**
 * Send a POST request with payload.
 *
 * The HTTP POST method sends data to the server. The type of the body of the request is indicated by the Content-Type header.
 *
 * @param url URL
 * @param params Payload.
 * @return {Promise<any>} Response data.
 * @see <a href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST'>HTTP request methods — POST | MDN</a>
 */
export function post (url: string, params: any): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    service.post(url, params)
      .then(resp => {
        resolve(resp)
      })
      .catch(rejectedReason => {
        reject(rejectedReason)
      })
  })
}

// noinspection JSUnusedGlobalSymbols
/**
 * Send a legacy POST request with URL search params.
 *
 * The HTTP POST method sends data to the server. The type of the body of the request is indicated by the Content-Type header.
 *
 * @see <a href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST'>HTTP request methods — POST | MDN</a>
 * @param url URL.
 * @param params URL search params.
 * @return {Promise<any>} Response data.
 */
export function legacyPost (url: string, params: any): Promise<any> {
  const urlSearchParams = new URLSearchParams()
  Object.keys(params).forEach(key => {
    urlSearchParams.append(key, params[key])
  })
  return new Promise<any>((resolve, reject) => {
    service.post(url, urlSearchParams)
      .then(resp => {
        resolve(resp)
      })
      .catch(rejectedReason => {
        reject(rejectedReason)
      })
  })
}

// noinspection JSUnusedGlobalSymbols
/**
 * Send a PUT request.
 *
 * The HTTP PUT request method creates a new resource or replaces a representation of the target resource with the request payload.
 * The difference between PUT and POST is that PUT is idempotent:
 * calling it once or several times successively has the same effect (that is no side effect), where successive identical POST may have additional effects, like passing an order several times.
 *
 * @param url URL.
 * @param params Params.
 * @returns {Promise<any>} Response data.
 * @see <a href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT'>HTTP request methods — PUT | MDN</a>
 */
export function put (url: string, params: any): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    service.put(url, {
      params: params
    }).then(resp => {
      resolve(resp)
    }).catch(rejectedReason => {
      reject(rejectedReason)
    })
  })
}

// noinspection JSUnusedGlobalSymbols
/**
 * The PATCH method is used to apply partial modifications to a resource.
 *
 * The HTTP PUT method only allows complete replacement of a document.
 * Unlike PUT, PATCH is not idempotent, meaning successive identical patch requests may have different effects.
 * However, it is possible to issue PATCH requests in such a way as to be idempotent.
 *
 * @param url URL.
 * @param params Params.
 * @return {Promise<any>} Response data.
 * @see <a href='https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH'>HTTP request methods — PATCH | MDN</a>
 */
export function patch (url: string, params: any): Promise<any> {
  return new Promise((resolve, reject) => {
    service.patch<any>(url, params)
      .then(resp => {
        resolve(resp)
      })
      .catch(rejectedReason => {
        reject(rejectedReason)
      })
  })
}
