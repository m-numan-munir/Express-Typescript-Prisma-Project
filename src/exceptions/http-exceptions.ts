import { Exception } from "../enum/exception";

export class HttpException extends Error {
  status: number;
  message: string;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const throwConflictException = (message: string) => {
  throw new HttpException(message, Exception.ConflictException);
};
