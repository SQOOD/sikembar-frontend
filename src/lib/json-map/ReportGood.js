const template = {
  year: {
    path: 'year',
  },
  rate: {
    path: 'rate',
  },
  report_type: {
    path: 'report_type',
  },
  assumptionValue: {
    path: 'assumption',
    transform: val => val.map(assumption => assumption.rate),
  },
  assumptionDetail: {
    path: 'assumption',
    transform: val => val.map(assumption => assumption.detail),
  },
  assumptionRate: {
    path: 'assumption',
    transform: val => val.map(assumption => assumption.rate),
  },
  assumptionPrice: {
    path: 'assumption',
    transform: val => val.map(assumption => assumption.price),
  },
  assumptionVolumeUnit: {
    path: 'assumption',
    transform: val => val.map(assumption => assumption.volume_unit),
  },
  assumptionCutOff: {
    path: 'assumption',
    transform: val => val.map(assumption => assumption.cut_off),
  },
  assumptionCutOffUnit: {
    path: 'assumption.cut_off_unit',
  },
  assumptionCurrency: {
    path: 'assumption.currency',
  },
  balanceValue: {
    path: 'balance.value',
  },
  balanceDetail: {
    path: 'balance.detail',
  },
  balanceCategory: {
    path: 'balance.category',
  },
  balanceSubCategory: {
    path: 'balance.sub_category',
  },
  budgetsValue: {
    path: 'budgets.value',
  },
  budgetsDetail: {
    path: 'budgets.detail',
  },
  capitalBudgetValue: {
    path: 'capital_budget.value',
  },
  capitalBudgetDetail: {
    path: 'capital_budget.detail',
  },
  cashflowValue: {
    path: 'cashflow.value',
  },
  cashflowCategory: {
    path: 'cashflow.category',
  },
  cashflowDetail: {
    path: 'cashflow.detail',
  },
  costOfGoodValue: {
    path: 'cost_of_good.value',
  },
  costOfGoodDetail: {
    path: 'cost_of_good.detail',
  },
  fuelRate: {
    path: 'fuel.rate',
  },
  fuelPrice: {
    path: 'fuel.price',
  },
  fuelCurrency: {
    path: 'fuel.currency',
  },
  investmentValue: {
    path: 'investment.value',
  },
  investmentDetail: {
    path: 'investment.detail',
  },
  lostProfitValue: {
    path: 'lost_profit.value',
  },
  lostProfitDetail: {
    path: 'lost_profit.detail',
  },
  lostProfitCategory: {
    path: 'lost_profit.detail',
  },
  otherFinanceValue: {
    path: 'other_finance.value',
  },
  otherFinanceDetail: {
    path: 'other_finance.detail',
  },
  operationCostValue: {
    path: 'operation_cost.value',
  },
  operationCostDetail: {
    path: 'operation_cost.detail',
  },
  royaltyValue: {
    path: 'royalty.value',
  },
  royaltyDetail: {
    path: 'royalty.detail',
  },
  stateRevenueDetail: {
    path: 'state_revenue.detail',
  },
  stateRevenueCategory: {
    path: 'state_revenue.category',
  },
  stateRevenueValue: {
    path: 'state_revenue.value',
  },
  sourceOfFundingValue: {
    path: 'source_of_funding.value',
  },
  sourceOfFundingDetail: {
    path: 'source_of_funding.detail',
  },
};

export default template;
