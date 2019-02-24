const request = require('superagent') //是nodejs里一个非常方便的客户端请求代理模块
const cheerio = require('cheerio') //为服务器特别定制的，快速、灵活、实施的jQuery核心实现
const fs = require('fs-extra') //丰富了fs模块，同时支持async/await
const path = require('path') //当前的路劲

let url = 'https://www.hiporn.net/chinese?sort=new&page='

async function getUrl() {
  let linkArr = []
  for (let i = 1; i <= 10; i++) {//我们这里就取5页好了，301页太多了。
    const res = await request.get(url + i)
    const $ = cheerio.load(res.text)
    $('.item-img').each(function (i, elem) {
      const href = "https://www.hiporn.net" + $(this).find('a').attr('href')

      console.log(href)
      let link = "https://www.hiporn.net" + $(this).find('a').attr('href')
      linkArr.push(link)
    })
  }
  return linkArr
}

async function getPic(urls) {
  const res = await request.get(urls)
  const $ = cheerio.load(res.text)

  let link = $(".btn-group").find('a').attr('href')
  console.log(link)
}

// function download(dir, imgUrl) {
//   const uer = imgUrl.split('?')
//   console.log(uer[0])
//   var bure = uer[0]
//   console.log(`正在下载${bure}`)
//   const filename = bure.split('/').pop()
//   const req = request.get(bure)
//   req.pipe(fs.createWriteStream(path.join(__dirname, 'cosplay', dir, filename)))

// }

async function init() {
  let urls = await getUrl()
  for (let url of urls) {
    await getPic(url)
  }
}
init()