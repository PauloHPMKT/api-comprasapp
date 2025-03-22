export interface HttpRequest<T> {
  body?: T;
  headers?: any;
  params?: any;
  query?: any;
  file?: any;
}

export interface HttpResponse {
  statusCode: number;
  body: any;
}
