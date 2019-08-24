export class Tab {
    constructor(id: number, name: string, link: string) {
      this.id = id;
      this.name = name;
      this.link = link;
    }
    link: string;
    id: number;
    name: string;
}
