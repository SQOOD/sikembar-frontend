import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import Assumption from '@/store/models/Assumption';
import Balance from '@/store/models/Balance';
import Budget from '@/store/models/Budget';
import Cashflow from '@/store/models/Cashflow';
import CostOfGood from '@/store/models/CostOfGood';
import Investment from '@/store/models/Investment';
import LostProfit from '@/store/models/LostProfit';
import OtherFinance from '@/store/models/OtherFinance';
import Procurement from '@/store/models/Procurement';
import Report from '@/store/models/Report';
import Royalty from '@/store/models/Royalty';
import SourceOfFunding from '@/store/models/SourceOfFunding';
import StateRevenue from '@/store/models/StateRevenue';
import User from '@/store/models/User';

Vue.use(Vuex);

const database = new VuexORM.Database();

// Register database here
database.register(Assumption);
database.register(Balance);
database.register(Budget);
database.register(Cashflow);
database.register(CostOfGood);
database.register(Investment);
database.register(LostProfit);
database.register(OtherFinance);
database.register(Procurement);
database.register(Report);
database.register(Royalty);
database.register(SourceOfFunding);
database.register(StateRevenue);
database.register(User);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
