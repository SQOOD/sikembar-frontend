import { Model } from '@vuex-orm/core';
import Report from '@/store/models/Report';

export default class LostProfit extends Model {
  static entity = 'lost_profits';

  static fields() {
    return {
      id: this.increment(),
      report: this.belongsTo(Report, 'report_id'),
      detail: this.attr(),
      value: this.number(),
    };
  }
}
