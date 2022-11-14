import { Catch, HttpException } from '@nestjs/common';
import { ArgumentsHost, RpcArgumentsHost } from '@nestjs/common/interfaces';
import { BaseExceptionFilter } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { BackendLogger } from '../logger/backend-logger';
const logger = new BackendLogger('Exception');

@Catch()
export class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    this.handleMessage(exception);

    // AllExceptionFilter.handleResponse(exception);
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

  private static handleResponse(exception: any): void {
    // let responseBody: any = { message: 'Internal server error' };
    // let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    // switch (exception.constructor) {
    //   case HttpException:
    //     responseBody = exception.getResponse();
    //     statusCode = exception.getStatus();
    //     response.status(statusCode).json(responseBody);
    //     break;
    //   case RpcException:
    //     break;
    //   default:
    //     response.status(401).json(exception.message);
    //     break;
    // }
  }
}
