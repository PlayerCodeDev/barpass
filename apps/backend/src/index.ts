import { startServer } from './server/http.js';
import { env } from './core/config/env.js';

(async () => {
  try {
    await startServer();
    console.log(`Backend listening on port ${env.PORT}`);
  } catch (err) {
    console.error('Fatal error during server star', err);
    process.exit(1);
  }
})();
