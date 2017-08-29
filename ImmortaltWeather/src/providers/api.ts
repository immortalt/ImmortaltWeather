import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs";
import { Response, Headers } from "@angular/http";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import 'rxjs/add/operator/map';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  /**
 * 数据查询默认超时设置（毫秒）
 */
  public dataQueryTimeout: number = 7000;
  /**
   * 数据上报默认超时设置（毫秒）
   */
  public dataPostTimeout: number = 12000;

  constructor(public http: Http) {
  }
  /**
      * 获取数据
      */
  getData(cmd: string, data: any): Observable<any> {

    let url = cmd;

    let opts = this.ensureGetOptions(data); //获取包含认证信息的头文件

    let res = this.http.get(url, opts)
      .timeout(this.dataQueryTimeout)
      .map(this.extractData)
      .catch(this.handleError);

    return res;

  }

  putData(cmd: string, data: any, head?: any): Observable<any> {

    let url = cmd;
    let opts = this.ensureHeaderOptions(head); //获取包含认证信息的头文件

    let res = this.http.put(url, JSON.stringify(data), opts)
      .timeout(this.dataPostTimeout)
      .map(this.extractData)
      .catch(this.handleError);

    return res;
  }
  /**
  * 确保请求头。可能用于认证信息
  * @returns {Headers}
  */
  ensureHeaderOptions(header: any): RequestOptions {
    var headers;

    ////application/json
    //application/x-www-form-urlencoded
    headers = new Headers(
      {
        'Content-Type': 'application/json',
        'TG-DEBUG': true,
        "Access-Control-Allow-Origin": "*",
      });

    //从指定头复制信息
    if (header != null) {

      if (header['Content-Type'] != null && header['Content-Type'] == "")
        headers.delete('Content-Type');
      else if (header['Content-Type'] != null)
        headers.set('Content-Type', header['Content-Type']);

      if (header['Cookie'] != null)
        headers.set('Cookie', header['Cookie']);
    }

    // let params = this.warpToQueryString(data); //包装查询参数

    let opts = new RequestOptions(
      {
        headers: headers,
        search: null
      }
    );


    return opts;
  }
  /**
   * 确保请求头。可能用于认证信息
   * @returns {Headers}
   */
  ensureGetOptions(data: any): RequestOptions {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
      });

    let params = this.warpToQueryString(data); //包装查询参数

    let opts = new RequestOptions(
      {
        headers: headers,
        search: params
      }
    );
    return opts;
  }

  //#region 参数处理

  /**
   *
   * @param data
   * @returns {any}
   */
  warpToQueryString(data: any): URLSearchParams {
    if (data == null)
      return null;

    let params = new URLSearchParams();

    //
    for (var key in data) {
      if (data.hasOwnProperty(key))
        params.set(key, data[key]);
    }

    return params;
  }
  /**
   * 数据萃取
   * @param res
   * @returns {从响应获取 json 对象|{}}
   * @remark 注意不同服务器的返回值拆包可能各有不同。
   */
  protected extractData(res: Response) {
    try {
      let data = res.json();//从响应获取 json 对象。

      return data || {};
    } catch (er) {
      return res.text();
    }
  }
  /**
   * 通用移除处理
   * @param error
   * @returns {ErrorObservable}
   */
  protected handleError(error: any): ErrorObservable {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let jsonDesc: any = null;


    //封装原始的错误信息

    let errorDesc = new Error();

    if (error.status == 0) {
      error.message = '无法访问网络，请检察您的网络连接后重试！';
      //alert('无法访问网络，请检察您的网络连接后重试！');
    }
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : '服务器访问出错';

    console.error(errorDesc);

    return Observable.throw(errorDesc);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(endpoint, body, options);
  }
}
