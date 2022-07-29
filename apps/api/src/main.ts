import { getConfig } from './config';
import { App } from './infra/server/App';
import { SugokuService } from './SugokuService';

const main = async () => {
  const config = await getConfig();
  new App(config, new SugokuService()).init().run();
};

main();
