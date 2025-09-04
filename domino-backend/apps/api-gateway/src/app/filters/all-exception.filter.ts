import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { status } from '@grpc/grpc-js';
import { Response } from 'express';
import { messages } from 'nx/src/utils/ab-testing';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {

    const response = host.switchToHttp().getResponse<Response>();

    if (this.isRpcError(exception)) {
      const codeRpc = exception['code'];
      const httpStatus = this.mapRpcCodeToHttpStatus(codeRpc);
      const message = exception['message'];

      response.status(httpStatus).json({
        httpStatus,
        message,
        codeRpc
      });
      return;
    }

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      response.status(statusCode).json({
        statusCode,
        message: exceptionResponse['message']
      });
    }


    response.status(500).json({
      httpStatus: 500,
      messages: 'Internal serve error || unhandle error - custom filter handle'
    });
  }

  private isRpcError(error) {
    return (error && error['code'] && error['message']);
  }

  private mapRpcCodeToHttpStatus(rpcCode: number): number {
    const mapping = {
      [status.NOT_FOUND]: HttpStatus.NOT_FOUND,
      [status.INVALID_ARGUMENT]: HttpStatus.BAD_REQUEST,
      [status.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
      [status.PERMISSION_DENIED]: HttpStatus.FORBIDDEN,
      [status.ALREADY_EXISTS]: HttpStatus.CONFLICT,
      [status.RESOURCE_EXHAUSTED]: HttpStatus.TOO_MANY_REQUESTS,
      [status.FAILED_PRECONDITION]: HttpStatus.BAD_REQUEST,
      [status.UNIMPLEMENTED]: HttpStatus.NOT_IMPLEMENTED,
      [status.UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
      [status.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR
    };

    return mapping[rpcCode] || HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
