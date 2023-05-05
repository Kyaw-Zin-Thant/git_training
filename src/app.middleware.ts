import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { IncomingMessage } from 'http';
const publicKey = fs.readFileSync(process.cwd()+'/src/config/jwtRS256.key.pub', 'utf8');
@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: IncomingMessage, res: Response, next: any) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, publicKey, {
        algorithms: ['RS256'],
      });
      console.log(req.url);
      const { userRole } = decoded;
      if (userRole == 'NORMAL' && req.method != 'GET') {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .send({ message: 'You have not permission' });
      } else if (req.url.includes('/admin') && userRole == 'ADMIN') {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .send({ message: 'You have not permission' });
      } else {
        next();
      }
    } catch (error) {}
  }
}
