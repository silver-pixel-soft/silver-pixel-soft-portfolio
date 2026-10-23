class ApiResponse {
  public statusCode: number;
  public data: any;
  public message: string;
  public success: boolean;

  constructor(
    statusCode: number,
    data: any,
    message: string = "Success"
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode >= 200 && statusCode < 300;
  }
}

export { ApiResponse };