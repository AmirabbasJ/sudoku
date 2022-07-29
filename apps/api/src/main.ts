import { getConfig } from './config';
import { App } from './infra/server/App';
import { SugokuService } from './service/SugokuService';

const main = () => {
  const config = getConfig();
  new App(config, new SugokuService()).init().run();
};

main();
