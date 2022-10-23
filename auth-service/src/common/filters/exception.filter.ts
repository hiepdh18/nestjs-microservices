import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import { ArgumentsHost, HttpArgumentsHost } from '@nestjs/common/interfaces';
import { BaseExceptionFilter } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';
import { BackendLogger } from '../logger/backend-logger';
const logger = new BackendLogger('Exception');

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse();
    this.handleMessage(exception);

    // Response to client
    AllExceptionFilter.handleResponse(response, exception);
  }

  private handleMessage(exception): void {
    let message = 'Internal Server Error';

    switch (exception.constructor) {
      case HttpException:
        message = exception.message;
      case RpcException:
        message = exception.message;
      default:
        message = exception.message;
        break;
    }
    logger.error(message, exception.toString());
  }

  private static handleResponse(response: Response, exception: any): void {
    let responseBody: any = { message: 'Internal server error' };
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case HttpException:
        responseBody = exception.getResponse();
        statusCode = exception.getStatus();
        response.status(statusCode).json(responseBody);
        break;
      case RpcException:
        break;
      default:
        responseBody = {
          statusCode: exception.response?.status || statusCode,
          message: exception.response.data.error || exception,
        };
        response.status(responseBody.statusCode).json(responseBody);
        break;
    }
  }
}
