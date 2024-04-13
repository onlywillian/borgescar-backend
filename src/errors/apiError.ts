export default class APIError extends Error {
  public readonly name: string;
  public readonly message: string;
  public readonly httpStatusCode: number;

  constructor(name: string, message: string, httpStatusCode: number) {
    super();
    this.name = name;
    this.message = message;
    this.httpStatusCode = httpStatusCode;
  }
}
