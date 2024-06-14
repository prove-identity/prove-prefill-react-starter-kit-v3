require('dotenv').config();
import { Api } from '@src/api';
import { App } from '@src/helpers/app.helper';

class ProvePrefillApi extends App {
  async init() {
    await Api.init();
  }
}

App.run(ProvePrefillApi);