const express = require('express');
const cors = require('cors');
require('./config/dotenv');
require('./database');

const { webhookRoutes } = require('./routes/webhookRoutes');
const { paymentRoutes } = require('./routes/paymentRoutes');

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
        verify: (req, res, buf) => {
          if (req.originalUrl.startsWith('/webhook')) req.rawBody = buf.toString();
        },
      })
    );
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  configRoutes() {
    webhookRoutes(this.app);
    paymentRoutes(this.app);
  }

  start() {
    this.app.listen(this.port, () => console.log(`listen port ${this.port}`));
  }
}

const app = new App();

app.start();
