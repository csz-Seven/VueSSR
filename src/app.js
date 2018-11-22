/**
 *  作者:Seven
 *  Email:csz.seven@gmail.com
 *  描述:VueSSR
 */
const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div style="font-weight: bold;font-size: 20px;color: blue">VueSRR(服务端渲染)访问的URL: {{url}}</div>`
    })

    renderer.renderToString(app)
        .then(html => {
            res.end(`
              <!DOCTYPE html>
              <meta charset="UTF-8">
              <html lang="en">
                <head><title>VueSSR(服务端渲染)</title></head>
                <body>${html}</body>
              </html>
            `)
        })
        .catch(err => {
            console.log(err)
            res.status(500).end('Error')
        })
})


server.listen(7777)


// const Vue = require('vue')
// const server = require('express')()
// const renderer = require('vue-server-renderer').createRenderer()
//
// server.get('*', (req, res) => {
//     const app = new Vue({
//         data: {
//             url: req.url
//         },
//         template: `<div>访问的 URL 是： {{ url }}</div>`
//     })
//
//     renderer.renderToString(app, (err, html) => {
//         if (err) {
//             res.status(500).end('Internal Server Error')
//             return
//         }
//         res.end(`
//       <!DOCTYPE html>
//       <html lang="en">
//         <head><title>Hello</title></head>
//         <body>${html}</body>
//       </html>
//     `)
//     })
// })
//
// server.listen(8080)
