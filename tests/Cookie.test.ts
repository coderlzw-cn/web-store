/**
 * @jest-environment jsdom
 */
import { getCookie, setCookie } from '../src/cookie'

test('Cookie', () => {
  setCookie({ key: 'name', value: '张三' })
  expect(getCookie('name')).toBe('张三')
  expect(getCookie('name1')).toBe(null)
})
