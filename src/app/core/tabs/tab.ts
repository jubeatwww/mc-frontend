export interface INavigation {
  name: string;
  url: string;
  metadata?: any;
}

export class Tab {
  public id: number;
  private pivot = 0;
  private top = 0;
  private history: INavigation[] = [];

  constructor(id: number, info: INavigation) {
    this.id = id;
    this.history.push({ ...info });
  }

  public push(info: INavigation): void {
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

  public next(): INavigation | null {
    const { history, pivot } = this;
    if (history[pivot + 1]) {
      this.pivot += 1;
      return { ...history[pivot] };
    }
    return null;
  }

  public prev(): INavigation | null {
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
