/// <reference types="node" />
import { NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { IncomingMessage } from 'http';
export declare class AppMiddleware implements NestMiddleware {
    use(req: IncomingMessage, res: Response, next: any): void;
}
