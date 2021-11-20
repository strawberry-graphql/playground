import { text2base, base2text, zip, unzip } from './zip'

test('basic', async () => {
  const data = await text2base('text')
  const text = await base2text(data)
  expect(text).toBe('text')
})

test('files', async () => {
  const bin = await zip({
    'a': 'hello',
    'b': 'world'
  })
  const obj = await unzip(bin)
  expect(obj).toEqual({
    'a': 'hello',
    'b': 'world'
  })
})

