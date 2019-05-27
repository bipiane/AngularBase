export class ErrorValidacion {

  propertyPath: string;
  code: string;
  message: string;

  constructor(data) {
    if (data) {
      this.propertyPath = data.propertyPath;
      this.code = data.code;
      this.message = data.message;
    }
  }
}
