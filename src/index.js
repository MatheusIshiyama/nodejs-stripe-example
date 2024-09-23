const express = require('express');
const cors = require('cors');
require('./config/dotenv');

const { webhookRoutes } = require('./routes/webhookRoutes');

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.setup();
  }

  setup() {
    this.configApp();

    this.configRoutes(this.app);
  }

  configApp() {
    this.app.use(
      express.json({
        verify: (req, res, buffer) => {
          req['rawBody'] = buffer.toString(); // Store raw body in request for later use
        },
      })
    );
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  configRoutes() {
    webhookRoutes(this.app);
  }

  start() {
    this.app.listen(this.port, () => console.log(`listen port ${this.port}`));
  }
}

const app = new App();

app.start();
