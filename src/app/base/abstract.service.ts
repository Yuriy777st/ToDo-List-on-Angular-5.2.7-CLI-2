import {Injectable}     from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';

import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';

@Injectable()
export class AbstractService {
    protected _apiUrl: string;

    protected static $accessDenied: Observable<any>;
    private static _accessDenied: any;
    private static _accessDeniedInited: boolean = false;

    constructor(protected http: HttpClient) {
    }

    public static getAdditionalHeaders() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',//no cache
            'Cache-Control': 'no-cache',//no cache
            'Pragma': 'no-cache'//no cache
        });
    }


    protected _post(action?: string, id?: string, body?: any) {
        return this.post(this._apiUrl + (id ? '/' + id : '') + (action ? '?action=' + action : ''), JSON.stringify(body));
    }

    protected _put(action?: string, id?: string, body?: any) {
        return this.put(this._apiUrl + (id ? '/' + id : '') + (action ? '?action=' + action : ''), JSON.stringify(body));
    }

    /* overwrited */
    protected put(url: string, body: string, options?: any): any {
        options = options || {};
        options.headers = AbstractService.getAdditionalHeaders();

        return new Promise((reslv, reject) => {
            this.http
                .put(url, body, options)
                .toPromise()
                .then(reslv)
                .catch((err: any) => {
                    if (err.status == 403) {
                        // this.onAccessDeniedResponse();
                    }
                    reject(err);
                });
        });
    }

    protected post(url: string, body: string, options?: any): any {
        options = options || {};
        options.headers = AbstractService.getAdditionalHeaders();

        return new Promise((reslv, reject) => {
            this.http
                .post(url, body, options)
                .toPromise()
                .then(reslv)
                .catch((err: any) => {
                    if (err.status == 403) {
                        // this.onAccessDeniedResponse();
                    }
                    reject(err);
                });
        });
    }

    protected delete(url: string, options?: any): any {
        options = options || {};
        options.headers = AbstractService.getAdditionalHeaders();

        return new Promise((reslv, reject) => {
            this.http
                .delete(url, options)
                .toPromise()
                .then(reslv)
                .catch((err: any) => {
                    if (err.status == 403) {
                        // this.onAccessDeniedResponse();
                    }
                    reject(err);
                });
        });
    }

    protected get(url: string, options?: any): any {
        AbstractService.onAccessDeniedInit();

        options = options || {};
        options.headers = AbstractService.getAdditionalHeaders();

        return new Promise((reslv, reject) => {
            this.http
                .get(url, options)
                .toPromise()
                .then(reslv)
                .catch((err: any) => {
                    if (err.status == 403) {
                        AbstractService._accessDenied.next(err);
                    }
                    reject(err);
                });
        });
    }

    protected static onAccessDeniedInit() {
        if (!AbstractService._accessDeniedInited) {
            AbstractService._accessDeniedInited = true;
            AbstractService.$accessDenied = new Observable(
                (observer: any) => {
                    AbstractService._accessDenied = observer
                }
            ).share();
            AbstractService.$accessDenied.subscribe();
        }
    }



}
