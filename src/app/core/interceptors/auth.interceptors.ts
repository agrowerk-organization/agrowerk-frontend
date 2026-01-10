import { Injectable } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { environment_development } from '../../../environment/environment.dev';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (req.url.startsWith(environment_development.apiUrl)) {  
    const authReq = req.clone({
      withCredentials: true
    });
    return next(authReq);
  }
  return next(req);
};