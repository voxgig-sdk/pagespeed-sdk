
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PagespeedSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PagespeedSDK.test()
    equal(testsdk instanceof PagespeedSDK, true,
      'PagespeedSDK.test() must return a client synchronously')
  })

})
