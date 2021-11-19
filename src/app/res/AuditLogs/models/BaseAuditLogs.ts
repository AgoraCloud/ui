import { CollectionModel, Model } from '@mars-man/models';

export class BaseAuditLogs extends CollectionModel {
  constructor() {
    super({
      collections: BaseAuditLog,
    });
  }
}

export class BaseAuditLog extends Model {
  constructor(config) {
    super(config);
  }
}
