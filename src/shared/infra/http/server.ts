import 'module-alias/register';

import logger from '@shared/utils/logger';
import app from './config/app';

app.listen(process.env.PORT || 3333, () => logger.info(`🚧 Server running 🚧`));
