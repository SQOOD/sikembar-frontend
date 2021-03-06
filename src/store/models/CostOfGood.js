import { Model } from '@vuex-orm/core';
import Report from '@/store/models/Report';

export default class CostOfGood extends Model {
  static entity = 'cost_of_goods';

  static fields() {
    return {
      id: this.increment(),
      report: this.belongsTo(Report, 'report_id'),
      detail: this.attr(),
      value: this.number(),
      category: this.attr(),
    };
  }
}
