import { HttpParams } from '@angular/common/http';

export function createHttpParams<T extends object>(params: T): HttpParams {
  let httpParams = new HttpParams();

  Object.keys(params).forEach((key) => {
    const value = (params as Record<string, unknown>)[key];

    if (value === null || value === undefined || value === '') {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== null && item !== undefined) {
          httpParams = httpParams.append(key, String(item));
        }
      });
    } else {
      httpParams = httpParams.set(key, String(value));
    }
  });

  return httpParams;
}