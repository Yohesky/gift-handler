export class Gift {
  constructor({ id, name, status, createdBy, createdAt }) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
  }

  static fromApi(apiGift) {
    return new Gift({
      id: String(apiGift.id),
      name: apiGift.title,
      status: "available",
      createdBy: apiGift.userDeviceId,
      createdAt: null,
    });
  }
}
