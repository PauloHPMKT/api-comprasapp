export interface HttpRequest {
  body?: any;
  headers?: any;
  params?: any;
  query?: any;
  file?: any;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}
