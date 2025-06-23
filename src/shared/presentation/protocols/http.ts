export interface HttpRequest<T = any> {
  body: T;
  params?: any;
  query?: any;
  headers?: any;
  file?: any;
}

export interface HttpResponse<T = any> {
  statusCode: number;
  body: T;
}
