import bodyParser from 'body-parser'
import compression from 'compression'
import express, { Request, Response } from 'express'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import { RegisterRoutes } from './generated/routes'


export const app = express()

const shouldCompress = (req: Request, res: Response): boolean => {
    if (req.headers['x-no-compression']) {
        return false
    }
    return compression.filter(req, res)
}

app.use(helmet())

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.json())

app.use(compression({
    filter: shouldCompress,
}))

app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
        swaggerUi.generateHTML(await import('./generated/swagger.json'))
    )
})

RegisterRoutes(app)

app.use(function notFoundHandler(_req: Request, res: Response) {
    res.status(404).send({
        message: 'Not Found'
    })
})
