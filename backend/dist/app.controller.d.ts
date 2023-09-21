import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    checkDbConnection(): "Connected to MongoDB" | "Not connected to MongoDB";
}
