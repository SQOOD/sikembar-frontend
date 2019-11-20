import { Model } from '@vuex-orm/core';

export default class User extends Model {
  static entity = 'users';

  static fields() {
    return {
      id: this.increment(),
      username: this.attr(),
      company_type: this.attr(),
      picture: this.attr().nullable(),
      commodity: this.attr(),
      role: this.attr(),
    };
  }
}
