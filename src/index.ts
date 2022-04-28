import { app } from './app'
import logger from './logger'

const port = process.env.PORT || 8044

app.listen(port, () =>
    logger.info(`Server is running on port ${port}`)
)
