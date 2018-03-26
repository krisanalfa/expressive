import * as fs from 'fs'
import * as path from 'path'
const edge = require('edge.js')
import * as Minifier from 'html-minifier'
import { Request, Response } from 'express'
import { NextFunction } from 'express-serve-static-core'

interface RenderFunction {
  (view: string, options?: Object, callback?: (err: Error, html: string) => void): void
}

interface ViewOptions {
  settings: {
    views: string
  }
}

interface EdgeRenderFunction {
  (filePath: string, options: ViewOptions, callback: (err: Error | null, html?: string) => void): void
}

/**
 * Custom view engine. Using edge template engine.
 *
 * @see https://expressjs.com/en/advanced/developing-template-engines.html
 * @see http://edge.adonisjs.com/docs/introduction
 */
export class View {
  private static registered: boolean
  private static loaded: boolean = false
  private static manifest: any = {}

  public static extends (method: string, resolver: Function) {
    edge.global(method, resolver)
  }

  public static edge () {
    if (this.registered) return (_: Request, __: Response, next: NextFunction) => next()

    this.registered = true

    // Setup edge
    edge.configure({ cache: process.env.NODE_ENV === 'production' })

    // Get the manifest package
    if (process.env.NODE_ENV === 'production' && !this.loaded) {
      this.loaded = true

      try {
        const manifestFile = path.join(__dirname, '..', '..', 'public', 'manifest.json')

        this.manifest = JSON.parse(fs.readFileSync(manifestFile, { encoding: 'utf-8', flag: 'r' }))
      } catch (error) {
        this.manifest = {}
      }
    }

    /*
    |-------------------------------------------------------------------------------------------------
    | Edge global function
    |-------------------------------------------------------------------------------------------------
    */
    // region edge global function
    edge.global('env', () => process.env.NODE_ENV || 'development')
    edge.global('asset', (name: string, type: string = '') => {
      if (this.manifest[name]) return this.manifest[name]

      const path = type || name.split('.').pop()

      return `/${path}/${name}`
    })
    // endregion edge global function

    return (req: Request, res: Response, next: NextFunction) => {
      /*
      |-------------------------------------------------------------------------------------------------
      | Override the app.render function so that we can use dot notation
      |-------------------------------------------------------------------------------------------------
      */
      const render = res.render
      const expressRenderFunction: RenderFunction = (view, options, callback) => {
        render.call(res, view.replace('.', '/'), options, callback)
      }

      res.render = expressRenderFunction

      /*
      |-------------------------------------------------------------------------------------------------
      | Register the edge view engine
      |-------------------------------------------------------------------------------------------------
      */
      const edgeRenderFunc: EdgeRenderFunction = (viewPath, options, callback) => {
        edge.registerViews(options.settings.views)

        fs.readFile(viewPath, { encoding: 'utf-8', flag: 'r' }, (err, content) => {
          if (err) return callback(err)

          let html = edge.renderString(content, options)

          if (process.env.NODE_ENV === 'production') {
            html = Minifier.minify(html, {
              removeComments: true,
              collapseWhitespace: true,
              collapseBooleanAttributes: true,
              removeAttributeQuotes: true,
              removeEmptyAttributes: true
            })
          }

          return callback(null, html)
        })
      }

      req.app.engine('edge', edgeRenderFunc)

      /*
      |-------------------------------------------------------------------------------------------------
      | Set the app view engine
      |-------------------------------------------------------------------------------------------------
      */
      req.app.set('view engine', 'edge')

      /*
      |-------------------------------------------------------------------------------------------------
      | Call next middleware
      |-------------------------------------------------------------------------------------------------
      */
      next()
    }
  }
}
