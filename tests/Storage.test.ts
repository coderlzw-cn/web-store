/**
 * @jest-environment jsdom
 */
import { getStorage, setStorage } from '../src/storage'

test('Storage', () => {
  setStorage({ key: 'name', value: '张三', type: 'localStorage' })
  expect(getStorage({ key: 'name', type: 'localStorage' })).toBe('张三')
})
