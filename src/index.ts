import { config } from './config';
import { app } from './config/express';

// Bind to a port
app.listen(config.SERVER_PORT, config.SERVER_HOST, () => {
  // eslint-disable-next-line no-console
  console.log(
    `🚀 Server started on http://${config.SERVER_HOST}:${config.SERVER_PORT} (${config.NODE_ENV})`,
  );
});
