import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import axios from 'axios';
import { baseApi, baseApiBack, baseApi2 } from './settings';


const get = (
    endpoint: string,
    useAuth: boolean,
    host: string,
    timeout?: number,

): Observable<any> => {
    return _axiosCall('get', endpoint, useAuth, host, { timeout });
};

const postFile = (endpoint: string, data: any, host: any): Observable<any> => {
    const body = new FormData();

    Object.keys(data).forEach(key => {
        body.append(key, data[key]);
    });

    return post(endpoint, body, true, host, 'json', 0);
};

const post = (
    endpoint: string,
    data: any,
    useAuth: boolean = true,
    host: string,
    responseType: string = 'json',
    timeout: number = 0,
): Observable<any> => {
    return _axiosCall('post', endpoint, useAuth, host, { responseType, timeout }, data);
};

const put = (
    endpoint: string,
    data: any,
    useAuth: boolean = true,
    host: string,
    responseType: string = 'json',
    timeout: number = 0,
): Observable<any> => {
    return _axiosCall('put', endpoint, useAuth, host, { responseType, timeout }, data);
};

const patch = (
    endpoint: string,
    data: any,
    useAuth: boolean = true,
    host: string,
    responseType: string = 'json',
    timeout: number = 0,
): Observable<any> => {
    return _axiosCall('patch', endpoint, useAuth, host, { responseType, timeout }, data);
};

const del = (
    endpoint: string,
    useAuth: boolean = true,
    host: string,
    responseType: string = 'json',
    timeout: number = 0,
): Observable<any> => {
    return _axiosCall('delete', endpoint, useAuth, host, { responseType, timeout });
};

const _axiosCall = (
    method: any,
    endpoint: string,
    useAuth: boolean,
    host: string,
    opts: any,
    data: any = {},
): Observable<any> => {
    // If is a relative URL, concat with baseAPI address, if not, use only the provided URL.
    const checkHost = host === 'local' ? baseApiBack : host === 'investing' ? baseApi2 : baseApi;
    const url = endpoint.substring(0, 4).includes('http') ? endpoint : checkHost + endpoint;



    // Make Axios Request and returns a Observable from it's Promise
    const makeAxiosRequest = switchMap(() => {
        const axiosPromise = axios.request({
            method,
            url,
            data,
            responseType: opts.responseType,
            timeout: opts.timeout,
            headers: useAuth ? { Authorization: `Bearer ` } : {},
        });

        return from(axiosPromise).pipe(map((i: any) => i.data));
    });

    const catchAxiosError = catchError(error => {
        if (error.response) {
            return throwError(error.response);
        } else if (error.request) {
            return throwError(error.request);
        } else {
            return throwError(error.message);
        }
    });

    // The returned Observable
    return of(true).pipe(
        makeAxiosRequest,
        catchAxiosError,
    );
};

export { get, post, postFile, put, patch, del };
