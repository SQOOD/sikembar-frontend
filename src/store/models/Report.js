import { Model } from '@vuex-orm/core';
import User from '@/store/models/User';

export default class Report extends Model {
  static entity = 'reports';

  static fields() {
    return {
      id: this.increment(),
      user: this.belongsTo(User, 'user_id'),
      term: this.attr(),
      report_type: this.attr(),
      currency: this.attr(),
      rate: this.number(),
      approved: this.boolean(),
      flag_for_deletion: this.boolean(),
    };
  }
}
