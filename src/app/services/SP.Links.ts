import { PortalLinkModel } from "../models/portalLink";

declare var SP: any;

export class SPLinksService {
  siteUrl = 'https://dsu.aubmc.org.lb';
  executor: any;
  private PortalLinks: PortalLinkModel[] = [];

  constructor() {
    this.execCrossDomainRequest();
  }

  getPortalLinks() {
    return this.PortalLinks.slice();
  }

  execCrossDomainRequest() {
    // console.log('test');
    this.executor = new SP.RequestExecutor(this.siteUrl);

    return this.executor.executeAsync(
        {
            // tslint:disable-next-line:quotemark
            url: this.siteUrl + "/_api/lists/getbytitle('PortalPages')/items",
            method: 'GET',
            headers: { 'Accept': 'application/json; odata=verbose' },
            success: (data) => {
                            const jsonObject = JSON.parse(data.body);

                            const results = jsonObject.d.results;
                            this.PortalLinks = [];

                            for (let i = 0; i < results.length; i++) {
                              this.PortalLinks.push( new PortalLinkModel(
                                results[i].Num,
                                results[i].Title,
                                results[i].Description,
                                results[i].Image.Url,
                                results[i].URL.Url
                              ));
                            }
                            return this.PortalLinks.slice();
            }, // this.successHandler,
            error: this.errorHandler
        }
    );
}

successHandler(data) {
    // console.log(data.body);

    const jsonObject = JSON.parse(data.body);
    let announcementsHTML = '';

    const results = jsonObject.d.results;
    const links = [];
    this.PortalLinks = [];

    for (let i = 0; i < results.length; i++) {
      announcementsHTML = announcementsHTML +
          '<p><h1>' + results[i].Title +
          '</h1>' + results[i].Description +
          '</p><hr>';

      links.push({ num: results[i].Num,
                    title: results[i].Title,
                    description: results[i].Description,
                    imageUrl: results[i].Image.Url,
                    url: results[i].URL.Url });
      /*
      this.PortalLinks.push({
        num: results[i].Num,
        title: results[i].Title,
        description: results[i].Description,
        imageUrl: results[i].Image.Url,
        url: results[i].URL.Url});
      */
      this.PortalLinks[i] = new PortalLinkModel(
        results[i].Num,
        results[i].Title,
        results[i].Description,
        results[i].Image.Url,
        results[i].URL.Url
      );

    }

    // console.log(this.PortalLinks);
    document.getElementById('renderAnnouncements').innerHTML =
        announcementsHTML;
    return this.PortalLinks.slice();
  }

   errorHandler(data, errorCode, errorMessage) {
    document.getElementById('renderAnnouncements').innerText =
        'Could not complete cross-domain call: ' + errorMessage;
  }
}
