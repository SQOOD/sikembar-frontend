import { Model } from '@vuex-orm/core';
import Report from '@/store/models/Report';

export default class OtherFinance extends Model {
  static entity = 'other_finances';

  static fields() {
    return {
      id: this.increment(),
      report: this.belongsTo(Report, 'report_id'),
      detail: this.attr(),
      value: this.number(),
    };
  }
}
