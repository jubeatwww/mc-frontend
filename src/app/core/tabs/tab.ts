export interface ITab {
  name: string;
  url: string;
  metadata?: any;
}

export class Tab {
  public id: number;
  private pivot = 0;
  private top = 0;
  private history: ITab[] = [];

  constructor(id: number, info: ITab) {
    this.id = id;
    this.history.push({ ...info });
  }

  public push(info: ITab): void {
    const { top, pivot } = this;
    if (pivot === top) {
      this.pivot += 1;
      this.top += 1;
      this.history.push({ ...info });
      return;
    }
    this.history.splice(pivot + 1);
    this.pivot += 1;
    this.top = this.pivot;
  }

  public next(): ITab | null {
    const { history, pivot } = this;
    if (history[pivot + 1]) {
      this.pivot += 1;
      return { ...history[pivot] };
    }
    return null;
  }

  public prev(): ITab | null {
    const { history, pivot } = this;
    if (history[pivot - 1]) {
      this.pivot -= 1;
      return { ...history[pivot] };
    }
    return null;
  }

  get current() {
    return this.history[this.pivot];
  }
}
