import { userRequest } from '././products/dto/user-request';
export declare class AppService {
    constructor();
    signUp: (req: userRequest) => Promise<any>;
    signIn: (req: userRequest) => Promise<any>;
}
