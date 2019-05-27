export class Utilidades {

  /**
   * Agrega los filtros de AgGrid a la API Query
   * @param filterModel AgGrid server side filter
   * @param query objeto query de API REST
   */
  static filter2Query(filterModel, query: any = {}) {
    Object.keys(filterModel).forEach(key => {
      const formatKey = Utilidades.replaceAll(key, '\\.', '->');

      const filter = filterModel[key].filter;
      switch (filterModel[key].type) {
        case 'lessThan':
          query[`${formatKey}[lt]`] = filter;
          break;
        case  'greaterThan':
          query[`${formatKey}[gt]`] = filter;
          break;
        case 'lessThanOrEqual':
          query[`${formatKey}[le]`] = filter;
          break;
        case  'greaterThanOrEqual':
          query[`${formatKey}[ge]`] = filter;
          break;
        case  'contains':
          query[`${formatKey}[like]`] = `%${filter}%`;
          break;
        case  'inRange':
          query[`${formatKey}[eq]`] = `${filter},${filterModel[key].filterTo}`;
          break;
        case  'notEqual':
          query[`${formatKey}[ne]`] = filter;
          break;
        default:
          query[formatKey] = filter;
          break;
      }
    });

    return query;
  }

  /**
   * Reemplaza todas las ocurrencias en un texto
   */
  static replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }
}
