export interface ApiResponseInterface<T = any> {
  statusCode: number;
  message: string;
  data?:T;
}
