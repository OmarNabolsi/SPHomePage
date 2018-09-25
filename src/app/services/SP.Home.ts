import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';


@Injectable()
export class SPHomeService {
  constructor(private http: Http) {}

  getPages() {
    const headers = new Headers();
    headers.append('Accept', 'application/json; odata=verbose');
    return this.http.get("https://dsu.aubmc.org.lb/_api/lists/getbytitle('PortalPages')/items", {headers: headers});
  }
}
