import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HeadersMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        req.headers['content-type'] = 'application/json';
        req.headers['x-apollo-operation-name'] = req.headers['x-apollo-operation-name'] || 'DefaultOperation';
        next();
    }
}
