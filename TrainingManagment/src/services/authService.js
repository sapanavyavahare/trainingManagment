global.fetch = require('node-fetch');
global.navigator = () => null;

const { successObject } = require('api-rsp');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const AuthenticationDetails = AmazonCognitoIdentity.AuthenticationDetails;
const { string } = require('@hapi/joi');
const request = require('request');
const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
// var pems;

// const { TrainerController } = require('../controllers');
// const trainerController = new TrainerController();
const poolData = {
    UserPoolId: 'us-east-1_CXvZbgJNc',
    ClientId: '49b1qv6osm5elcn4niefgsmie2',
};
const pool_region = 'us-east-1';
class AuthService {
    constructor() {
        const poolData1 = {
            UserPoolId: 'us-east-1_CXvZbgJNc',
            ClientId: '49b1qv6osm5elcn4niefgsmie2',
        };

        this.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData1);
    }
    async register(body) {
        console.log('in auth servic ', body);
        var email = body.email;
        var password = body.password;
        var attributeList = [];

        this.userPool.signUp(
            email,
            password,
            attributeList,
            null,
            function (err, result) {
                if (err) {
                    console.log('err in signUp ', err);
                    return err;
                } else {
                    console.log('resukt ', result);

                    var cognitoUser = result.user;
                    console.log('cognitoUser ', cognitoUser);
                    // const trainer = trainerController.signUp(body, res);
                    return successObject({ trainer: cognitoUser });
                }
            }
        );
    }

    async confirmUser(username, verificationCode) {
        return await new Promise((resolve, reject) => {
            const userData = {
                Username: username,
                Pool: this.userPool,
            };
            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            cognitoUser.confirmRegistration(
                verificationCode,
                true,
                (err, result) => {
                    if (err) {
                        console.log('error ', err);
                        reject(err);
                    } else {
                        console.log('result ', result);
                        resolve(result);
                    }
                }
            );
        });
    }

    async signIn(username, password) {
        return await new Promise((resolve, reject) => {
            const authenticationDetails = new AuthenticationDetails({
                Username: username,
                Password: password,
            });

            const userData = {
                Username: username,
                Pool: this.userPool,
            };
            const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result) => {
                    console.log('result ', result);
                    const accessToken = result.getIdToken().getJwtToken();
                    console.log('access token ', accessToken);
                    resolve(accessToken);
                },
                onFailure: (err) => {
                    console.log('error ', err);
                    reject(err);
                },
            });
        });
    }

    // async validate(token, callback) {
    //     console.log('pool region', pool_region);
    //     console.log('pool data ', poolData.UserPoolId);

    //     request(
    //         {
    //             url: `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`,
    //             json: true,
    //         },
    //         function (error, response, body) {
    //             if (!error && response.statusCode === 200) {
    //                 pems = {};
    //                 var keys = body['keys'];
    //                 for (var i = 0; i < keys.length; i++) {
    //                     var key_id = keys[i].kid;
    //                     var modulus = keys[i].n;
    //                     var exponent = keys[i].e;
    //                     var key_type = keys[i].kty;
    //                     var jwk = { kty: key_type, n: modulus, e: exponent };
    //                     var pem = jwkToPem(jwk);
    //                     pems[key_id] = pem;
    //                 }
    //                 var decodedJwt = jwt.decode(token, { complete: true });
    //                 if (!decodedJwt) {
    //                     console.log('Not a valid JWT token');
    //                     callback(new Error('Not a valid JWT token'));
    //                 }
    //                 var kid = decodedJwt.header.kid;
    //                 var pem = pems[kid];
    //                 if (!pem) {
    //                     console.log('Invalid token');
    //                     callback(new Error('Invalid token'));
    //                 }
    //                 jwt.verify(token, pem, function (err, payload) {
    //                     if (err) {
    //                         console.log('Invalid Token.');
    //                         callback(new Error('Invalid token'));
    //                     } else {
    //                         console.log('Valid Token.');
    //                         callback(null, 'Valid token');
    //                     }
    //                 });
    //             } else {
    //                 console.log('Error! Unable to download JWKs');
    //                 console.log('error', error);
    //                 callback(error);
    //             }
    //         }
    //     );
    // }
}

module.exports = AuthService;
