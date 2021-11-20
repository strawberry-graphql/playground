import JSZip from 'jszip'

const filename = '_'

export const text2base = async (text) => {
  const zip = new JSZip()
  zip.file(filename, text)
  const data = await zip.generateAsync({ type: 'base64' })
  return data
}

export const base2text = async (data) => {
  const zip = new JSZip()
  await zip.loadAsync(data, { base64: true })
  const text = await zip.file(filename).async('string')
  return text
}

export const zip = async (files) => {
  const jszip = new JSZip()
  for (const [name, content] of Object.entries(files)) {
    jszip.file(name, content)
  }
  return await jszip.generateAsync({ type: 'base64' })
}

export const unzip = async (zip) => {
  const jszip = new JSZip()
  await jszip.loadAsync(zip, { base64: true })
  const files = {}
  for (const [name, file] of Object.entries(jszip.files)) {
    files[name] = await file.async('string')
  }
  return files
}
