import { Model } from '@vuex-orm/core';
import Report from '@/store/models/Report';

export default class Budget extends Model {
  static entity = 'budgets';

  static fields() {
    return {
      id: this.increment(),
      report: this.belongsTo(Report, 'report_id'),
      currency: this.attr(),
      rate: this.number(),
      volume_unit: this.attr(),
      volume_value: this.number(),
      price: this.number(),
      cut_off_unit: this.attr(),
      cut_off: this.attr(),
    };
  }
}
