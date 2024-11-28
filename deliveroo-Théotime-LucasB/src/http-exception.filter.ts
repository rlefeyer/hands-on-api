import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: this.formatMessage(message),
    };

    response.status(status).json(errorResponse);
  }

  private formatMessage(message: any): string {
    if (typeof message === 'string') {
      return message;
    }
    if (typeof message === 'object' && message.message) {
      return Array.isArray(message.message) ? message.message.join(', ') : message.message;
    }
    return 'An unexpected error occurred';
  }
}