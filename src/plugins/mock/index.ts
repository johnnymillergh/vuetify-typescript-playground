// @ts-ignore
import Mock from 'mockjs'

export const mock = Mock
mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
mock.XHR.prototype.send = function () {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

mock.mock(/\/api\/get/, 'get', login)

function login (res: any): any {
  return {
    code: 200,
    message: 'Response done.'
  }
}
