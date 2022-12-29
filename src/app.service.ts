import { Body, Injectable } from '@nestjs/common';
import { userRequest } from '././products/dto/user-request';
import { usermodel } from 'src/db/userschema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AppService {
    constructor() { }
    signUp = async function (req: userRequest) {
        let result;
        try {
            if (req.Email && !req.Email.includes('@')) {
                result = {result: 'Email ID is invalid'};
                throw new Error('Email ID is invalid');
            }
           
          //  let userData =  usermodel.find({'Email':req.Email});
            let userData = await usermodel.findOne({'Email':req.Email});
            console.log(userData);
            if (userData) {
                result ={};
                result = {result: 'Email Id already exists'};
                throw new Error('Email Id already exists');
            } else {
            let user = new usermodel(req);
            let dbResult = await user.save();
            if (dbResult !== undefined) {
                result = { result: 'Registration done Successfully' };
            }
            else {
                result = { result: 'Failed to register' };
            }
        }
        } catch (error) {
            console.log('error is ', error);
            result = { result: result ? result : error?.data?.message? error.data.message: error?.Error?error.Error:'error occured' };
        } finally {
            console.log('final result is',result);
            return result;
        }
    }
    signIn = async function (req: userRequest) {
        let result;
      //  let user = new usermodel(req);
        let userData = await usermodel.findOne({'Email':req.Email});
        console.log(userData);
        if (!userData) {
            result = {result: 'User not found'};
              //  throw new Error('User not found');
          } else {
           
          var passwordIsValid = req.Password === userData.Password ? true : false
          //bcrypt.compareSync(
           // req.Password.toString(),
            //userData.Password.toString()
         // ); 
         
          if (!passwordIsValid) {
            result = {result: 'Invalid Password!'};
            //  result.status(401).send({
            //   accessToken: null,
            //   message: "Invalid Password!"
            // });
            return result;
          }
          var token = jwt.sign({ id: userData._id }, 'e-auction', {
            expiresIn: 86400 // 24 hours
          });        
          
          let res = {
            id: userData._id,
            email: userData.Email,
            userData : userData,
            accessToken: token
          }
          result = {result: res};
        }
          return result;
    }

}
