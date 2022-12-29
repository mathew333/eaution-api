import { AppService } from './app.service';
import { userRequest } from './products/dto/user-request';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    signUp(req: userRequest): Promise<any>;
    signIn(req: userRequest): Promise<any>;
}
