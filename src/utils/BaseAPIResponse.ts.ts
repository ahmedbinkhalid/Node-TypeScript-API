export class BaseAPIResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];

  constructor(success: boolean, message: string, data?: T, errors?: string[]) {
    this.success = success;
    this.message = message;
    if (data) this.data = data;
    if (errors) this.errors = errors;
  }

  // Optional: Static helpers
  static success<T>(message: string, data?: T): BaseAPIResponse<T> {
    return new BaseAPIResponse<T>(true, message, data);
  }

  static error(message: string, errors?: string[]): BaseAPIResponse {
    return new BaseAPIResponse(false, message, undefined, errors);
  }
}
