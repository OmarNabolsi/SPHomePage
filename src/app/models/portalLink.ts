
export class PortalLinkModel {
  num: number;
  title: string;
  description: string;
  imageUrl: string;
  url: string;

  constructor(num: number, title: string, description: string, imageUrl: string, url: string) {
    this.num = num;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.url = url;
  }
}
