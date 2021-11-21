import { CollectionModel, Model } from '@mars-man/models';

export class BaseAuditLogs extends CollectionModel {
  constructor(config) {
    super({
      ...config,
      collections: BaseAuditLog,
    });
  }
}

export class BaseAuditLog extends Model {
  constructor(config) {
    super(config);
  }
}
