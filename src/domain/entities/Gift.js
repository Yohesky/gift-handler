export class Gift {
  constructor({ id, name, status, createdBy, createdAt }) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
  }

  static create({ name, createdBy }) {
    return new Gift({
      id: crypto.randomUUID(),
      name,
      status: "available",
      createdBy,
      createdAt: new Date().toISOString(),
    });
  }
}
