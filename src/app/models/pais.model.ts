export class Pais {

  codigo: string;
  descripcion: string;

  constructor(data) {
    if (data) {
      this.codigo = data.codigo;
      this.descripcion = data.descripcion;
    }
  }
}
