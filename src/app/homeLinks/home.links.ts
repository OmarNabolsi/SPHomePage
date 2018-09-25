import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-home-links',
  templateUrl: 'home.links.html'
})
// tslint:disable-next-line:component-class-suffix
export class HomeLinks {
  @Input() portalPages: any;

  mouseOver(id) {
    document.getElementById(id).style.top = "0px";
    document.getElementById(id).style.transition = "0.3s";
  }

  public mouseOut(id) {
    document.getElementById(id).style.top = "100px";
  }
}
