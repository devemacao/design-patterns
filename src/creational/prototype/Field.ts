import Prototype from "./Prototype";

export default class Field implements Prototype {
  constructor(
    readonly fieldId: string,
    readonly type: string,
    readonly title: string
  ) {}

  static create(type: string, title: string) {
    const fieldId = crypto.randomUUID();
    return new Field(fieldId, type, title);
  }

  clone(): Field {
    const newField = new Field(this.fieldId, this.type, this.title);
    return newField;
  }
}
