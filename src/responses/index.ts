export * from './errors';
export * from './replies';

export class APIResponse<T> {
  public $type!: 'reply' | 'error';
  public statusCode!: number;
  public code!: string;
  public message?: string;
  public data?: T;

  constructor(args: APIResponse<T>) {
    this.$type = args.$type;
    this.statusCode = args.statusCode;
    this.code = args.code;
    this.message = args.message;
    this.data = args.data;
  }
}
