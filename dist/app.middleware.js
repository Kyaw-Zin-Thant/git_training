"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const publicKey = fs.readFileSync('./src/config/jwtRS256.key.pub', 'utf8');
let AppMiddleware = class AppMiddleware {
    use(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, publicKey, {
                algorithms: ['RS256'],
            });
            console.log(req.url);
            const { userRole } = decoded;
            if (userRole == 'NORMAL' && req.method != 'GET') {
                res
                    .status(common_1.HttpStatus.UNAUTHORIZED)
                    .send({ message: 'You have not permission' });
            }
            else if (req.url.includes('/admin') && userRole == 'ADMIN') {
                res
                    .status(common_1.HttpStatus.UNAUTHORIZED)
                    .send({ message: 'You have not permission' });
            }
            else {
                next();
            }
        }
        catch (error) { }
    }
};
AppMiddleware = __decorate([
    (0, common_1.Injectable)()
], AppMiddleware);
exports.AppMiddleware = AppMiddleware;
//# sourceMappingURL=app.middleware.js.map