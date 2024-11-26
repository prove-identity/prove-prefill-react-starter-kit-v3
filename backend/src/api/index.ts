import 'reflect-metadata';
import express from 'express';
//module import
import { API_PORT } from '@src/api/(constants)';
import { setGlobalMiddleware, handleErrors } from '@src/api/api.middleware';
import apiRouter from '@src/api/api.router';

export class Api {
  private static app = express();
  private static server: any; // Keep a reference to the server instance

  static async init(): Promise<void> {
    this.setGlobalMiddleware();
    this.setupRoutes();
    this.errorHandling();
    //! Add Connection to Database here
    this.server = this.listen(); // Store the server instance when listening
    this.registerGracefulShutdown(); // Register the signal handlers
  }

  private static setGlobalMiddleware() {
    setGlobalMiddleware(this.app);
  }

  private static setupRoutes() {
    this.app.use('/api/v3', apiRouter);
  }

  private static errorHandling() {
    this.app.use(handleErrors);
  }

  private static listen() {
    return this.app.listen(API_PORT, () =>
      console.log(`API running at http://localhost:${API_PORT}`),
    );
  }

  private static async closeServer(): Promise<void> {
    if (this.server) {
      console.log('Closing the server...');
      await new Promise<void>((resolve) => {
        this.server?.close((err: any) => {
          if (err) {
            console.log('Error closing the server:', err);
          } else {
            console.log('Server closed successfully.');
          }
          resolve();
        });
      });
    }
  }

  private static registerGracefulShutdown() {
    process.on('SIGINT', async () => {
      console.log('\nReceived SIGINT signal. Shutting down gracefully...');
      await this.closeServer();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\nReceived SIGTERM signal. Shutting down gracefully...');
      await this.closeServer();
      process.exit(0);
    });
  }
}
