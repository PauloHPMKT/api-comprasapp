export interface HttpRequest {
  body?: any;
  params?: any;
  headers?: any;
  query?: any;
  file?: any;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}
