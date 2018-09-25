import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SPLinksService } from './services/SP.Links';
import { PortalLinkModel } from './models/portalLink';
import { SPHomeService } from './services/SP.Home';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  PortalLinks: PortalLinkModel[] = [];

  constructor(private spLinks: SPLinksService, private spHome: SPHomeService) {
    this.onGetHome();
  }

  onGetHome() {
    this.spHome.getPages()
    .subscribe(
      (r) => {
        const data = JSON.parse(r._body);
        const results = data.d.results;

        for (let i = 0; i < results.length; i++) {
          this.PortalLinks.push( new PortalLinkModel(
            results[i].Num,
            results[i].Title,
            results[i].Description,
            results[i].Image.Url,
            results[i].URL.Url
          ));
        }
      },
      (e) => console.log(e)
    );
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }


  onTestClick() {
  }
}
