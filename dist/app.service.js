"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const userschema_1 = require("./db/userschema");
const jwt = require("jsonwebtoken");
let AppService = class AppService {
    constructor() {
        this.signUp = async function (req) {
            var _a;
            let result;
            try {
                if (req.Email && !req.Email.includes('@')) {
                    result = { result: 'Email ID is invalid' };
                    throw new Error('Email ID is invalid');
                }
                let userData = await userschema_1.usermodel.findOne({ 'Email': req.Email });
                console.log(userData);
                if (userData) {
                    result = {};
                    result = { result: 'Email Id already exists' };
                    throw new Error('Email Id already exists');
                }
                else {
                    let user = new userschema_1.usermodel(req);
                    let dbResult = await user.save();
                    if (dbResult !== undefined) {
                        result = { result: 'Registration done Successfully' };
                    }
                    else {
                        result = { result: 'Failed to register' };
                    }
                }
            }
            catch (error) {
                console.log('error is ', error);
                result = { result: result ? result : ((_a = error === null || error === void 0 ? void 0 : error.data) === null || _a === void 0 ? void 0 : _a.message) ? error.data.message : (error === null || error === void 0 ? void 0 : error.Error) ? error.Error : 'error occured' };
            }
            finally {
                console.log('final result is', result);
                return result;
            }
        };
        this.signIn = async function (req) {
            let result;
            let userData = await userschema_1.usermodel.findOne({ 'Email': req.Email });
            console.log(userData);
            if (!userData) {
                result = { result: 'User not found' };
            }
            else {
                var passwordIsValid = req.Password === userData.Password ? true : false;
                if (!passwordIsValid) {
                    result = { result: 'Invalid Password!' };
                    return result;
                }
                var token = jwt.sign({ id: userData._id }, 'e-auction', {
                    expiresIn: 86400
                });
                let res = {
                    id: userData._id,
                    email: userData.Email,
                    userData: userData,
                    accessToken: token
                };
                result = { result: res };
            }
            return result;
        };
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map