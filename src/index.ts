import './config/instrumentation';

import { config } from './config';
import { app } from './config/express';

// Bind to a port
app.listen(config.PORT, config.HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server started on http://${config.HOST}:${config.PORT} (${config.NODE_ENV})`);
});
