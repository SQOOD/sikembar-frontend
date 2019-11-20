import { Model } from '@vuex-orm/core';
import Report from '@/store/models/Report';

export default class Fuel extends Model {
  static entity = 'fuels';

  static fields() {
    return {
      id: this.increment(),
      report: this.belongsTo(Report, 'report_id'),
      currency: this.attr(),
      rate: this.number(),
      price: this.number(),
    };
  }
}
