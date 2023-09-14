import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/check-db-connection')
  checkDbConnection() {
    // You can add more complex checks here if needed
    if (this.appService.isDbConnected()) {
      return 'Connected to MongoDB';
    } else {
      return 'Not connected to MongoDB';
    }
  }
}
