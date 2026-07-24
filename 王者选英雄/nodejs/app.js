const app = require('express')()
const axios = require('axios')
const cors = require('cors')
const sharp = require('sharp')
app.use(cors())

app.get('/', (req, res) => {
  res.send('backend is running')
})

app.get('/render', async (req, res) => {
  try {
    let result = await axios.get('https://pvp.qq.com/zlkdatasys/heroskinlist.json')
    res.send(result.data.yxlb20_2489)
  } catch (err) {
    console.log(err.message)
  }
})

// 图片代理 + 缩放 —— 把 2000px 的原图缩到 160px (2x retina)，从几 MB 变几 KB
app.get('/image', async (req, res) => {
  try {
    const { url, w = 160 } = req.query
    if (!url) return res.status(400).send('missing url')
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const resized = await sharp(response.data).resize(Number(w)).webp({ quality: 80 }).toBuffer()
    res.set('Content-Type', 'image/webp')
    res.set('Cache-Control', 'public, max-age=86400')
    res.send(resized)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('proxy error')
  }
})

let port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`服务器已启动,端口号${port}`)
})
