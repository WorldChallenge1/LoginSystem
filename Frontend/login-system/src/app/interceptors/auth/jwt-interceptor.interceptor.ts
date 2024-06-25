import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("JWT interceptor: ", req)
  const token = sessionStorage.getItem("token") || "";
  if (token != "") {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json;charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
  }
  return next(req);
};
