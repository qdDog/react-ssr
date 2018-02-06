import React from 'react'
import { StaticRouter } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import App from '../client/app'

async function routesMiddleware(ctx, next) {
  const context = {}

  const html = ReactDOMServer.renderToString(
    <StaticRouter
      location={ctx.url}
      context={context}
    >
      <App />
    </StaticRouter>
  )
  console.log(context)
  if (context.url) {
    ctx.response.status = 301
    ctx.response.redirect(context.url);
  } else {
    ctx.response.body = `<!doctype html><div id="root">${html}</div>`
    // ctx.render(`
    //   <!doctype html>
    //   <div id="root">${html}</div>
    // `)
    await next()
  }
}

export default routesMiddleware
