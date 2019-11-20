import { Model } from '@vuex-orm/core';
import Report from '@/store/models/Report';

export default class Budget extends Model {
  static entity = 'budgets';

  static fields() {
    return {
      id: this.increment(),
      report: this.belongsTo(Report, 'report_id'),
      detail: this.attr(),
      spec: this.attr(),
      volume_unit: this.attr(),
      volume_value: this.number(),
      unit_price_type: this.attr(),
      unit_price: this.number(),
      category: this.attr(),
      project_area: this.attr(),
      country_of_origin: this.attr(),
      province_of_origin: this.attr(),
      city_of_origin: this.attr(),
      district_of_origin: this.attr(),
      tkdn_type: this.attr(),
      tkdn: this.number(),
    };
  }
}
