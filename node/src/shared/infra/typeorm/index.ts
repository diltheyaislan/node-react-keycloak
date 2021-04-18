import { createConnections, getConnectionOptions } from 'typeorm';

(async () => {
  await createConnections();
})();
