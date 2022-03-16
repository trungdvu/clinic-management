export class LocalStorageService {
  private get key() {
    return this.constructor.name;
  }
  save() {
    const jsonString = JSON.stringify(this);
    localStorage.setItem(this.key, jsonString);
  }

  load() {
    const jsonString = localStorage.getItem(this.key);
    if (jsonString) {
      const jsonObject = JSON.parse(jsonString);
      Object.assign(this, jsonObject);
    }
  }
}
