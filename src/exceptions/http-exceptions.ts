import { Exception } from "../enums/exception";

export class HttpException extends Error {
  status: number;
  message: string;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const throwInternalServerException = (message: string) => {
  throw new HttpException(message, Exception.InternalServerError);
};
export const throwConflictException = (message: string) => {
  throw new HttpException(message, Exception.ConflictException);
};

export const throwNotFoundException = (message: string) => {
  throw new HttpException(message, Exception.NotFoundException);
};

export const throwAccessDeniedException = (message: string) => {
  throw new HttpException(message, Exception.AccessDenied);
};

export const throwValidationException = (message: string) => {
  throw new HttpException(message, Exception.BadRequest);
};
