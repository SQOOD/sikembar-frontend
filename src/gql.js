let query = {
	allUser: `query getAllUser {
      users {
        user_id
        username
        fullname
        password
        company_type
        role
      }
    }`,

	singleUser: `query getSingleUser($userId: Int!) {
      user(user_id: $userId) {
        user_id
        username
        fullname
        password
        company_type
        role
      }
    }`,

    addUser: `mutation createSingleUser($input:UsersInput) {
          createUser(input: $input) {
              fullname
          }
  	}`,

  	updateUser: `mutation updateSingleUser($userId: Int!, $input:UsersInput) {
          updateUser(user_id: $userId, input: $input) {
              user_id
          }
  	}`,

  	deleteUser: `mutation deleteSingleUser($userId: Int!) {
	      deleteUser(user_id: $userId) {
	          user_id
	      }
  	}`,

    allCommerce: `query getAllItem {
	    commerces {
	      commerce_id
	      name
	      price
	      qty
	      description
	      category
	      user_id
	      image
	    }
  	}`,

    singleCommerce: `query getSingleItem($commerceId: Int!) {
	    commerce(commerce_id: $commerceId) {
	      commerce_id
	      name
	      price
	      qty
	      description
	      category
	      user_id
	      image
	    }
  	}`,

  	addCommerce: `mutation createSingleCommerce($input:CommercesInput) {
	      createCommerce(input: $input) {
	          commerce_id
	      }
  	}`,

  	updateCommerce: `mutation updateSingleCommerce($commerceId: Int!, $input:CommercesInput) {
          updateCommerce(_id: $commerceId, input: $input) {
              commerce_id
          }
 	}`,

 	deleteCommerce: `mutation deleteSingleCommerce($commerceId: Int!) {
          deleteCommerce(_id: $commerceId) {
              commerce_id
          }
  	}`,

  	allRole: `query getAllRole {
	    roles {
	        role_name
	    }
  	}`,

  	allPlugin: `query getAllPlugin {
        plugins {
          name
          status
        }
  	}`,

  	allReport: `query getAllReport {
	    reports {
	        report_id
	        user_id
	        year
	        term
	        report_type
	        currency
	        rate
	        approved
	        flagged_for_deletion
	    }
  	}`,

  	addReport: `mutation createSingleReport($input:ReportsInput) {
	      createReport(input: $input) {
	          report_id
	      }
  	}`,

  	updateReport: `mutation updateSingleReport($reportId: Int!, $input:ReportsInput) {
          updateReport(report_id: $reportId, input: $input) {
              report_id
          }
 	}`,

  	deleteReport: `mutation deleteSingleReport($reportId: Int!) {
	      deleteReport(report_id: $reportId) {
	          report_id
	      }
  	}`,

  	allBalance: `query getAllBalance {
	    balances {
	        balance_id
	        report_id
	        detail
	        value
	        category
	        sub_category
	    }
  	}`,

  	addBalance: `mutation createSingleBalance($input:BalancesInput) {
	      createBalance(input: $input) {
	          balance_id
	      }
  	}`,

  	deleteBalance: `mutation deleteSingleBalance($balanceId: Int!) {
	      deleteBalance(balance_id: $balanceId) {
	          balance_id
	      }
  	}`,

  	allProfitLoss: `query getAllProfitLoss {
	    profit_losses {
	        profit_loss_id
	        report_id
	        detail
	        value
	        category
	    }
  	}`,

  	addProfitLoss: `mutation createSingleProfitLoss($input:ProfitLossesInput) {
	      createProfitLoss(input: $input) {
	          profit_loss_id
	      }
  	}`,

  	deleteProfitLoss: `mutation deleteSingleProfitLoss($profitLossesId: Int!) {
	      deleteProfitLoss(profit_loss_id: $profitLossId) {
	          profit_loss_id
	      }
  	}`,

  	allNationalIncome: `query getAllNationalIncome {
	    national_incomes {
	        national_income_id
	        report_id
	        detail
	        value
	        category
	    }
  	}`,

  	addNationalIncome: `mutation createSingleNationalIncome($input:NationalIncomesInput) {
	      createNationalIncome(input: $input) {
	          national_income_id
	      }
  	}`,

  	deleteNationalIncome: `mutation deleteSingleNationalIncome($nationalIncomeId: Int!) {
	      deleteNationalIncome(national_income_id: $nationalIncomeId) {
	          national_income_id
	      }
  	}`,

  	allCashflow: `query getAllCashflow {
	    cashflows {
	        cashflow_id
	        report_id
	        detail
	        value
	        category
	    }
  	}`,

  	addCashflow: `mutation createSingleCashflow($input:CashflowsInput) {
	      createCashflow(input: $input) {
	          cashflow_id
	      }
  	}`,

  	deleteCashflow: `mutation deleteSingleCashflow($nationalIncomeId: Int!) {
	      deleteCashflow(cashflow_id: $cashflowId) {
	          cashflow_id
	      }
  	}`,

  	allBudget: `query getAllBudget {
	    budgets {
	        budget_id
	        report_id
	        detail
	        value
	        category
	    }
  	}`,

  	addBudget: `mutation createSingleBudget($input:BudgetsInput) {
	      createBudget(input: $input) {
	          budget_id
	      }
  	}`,

  	deleteBudget: `mutation deleteSingleBudget($budgetId: Int!) {
	      deleteBudget(budget_id: $budgetId) {
	          budget_id
	      }
  	}`,

  	allCostofgood: `query getAllCostofgood {
	    costofgoods {
	        costofgood_id
	        report_id
	        detail
	        value
	    }
  	}`,

  	addCostofgood: `mutation createSingleCostofgood($input:CostofgoodsInput) {
	      createCostofgood(input: $input) {
	          costofgood_id
	      }
  	}`,

  	deleteCostofgood: `mutation deleteSingleCostofgood($costofgoodId: Int!) {
	      deleteCostofgood(costofgood_id: $costofgoodId) {
	          costofgood_id
	      }
  	}`,

  	allSourceOfFinancing: `query getAllSourceOfFinancing {
	    source_of_financings {
	        source_of_financing_id
	        report_id
	        detail
	        value
	    }
  	}`,

  	addSourceOfFinancing: `mutation createSingleSourceOfFinancing($input:SourceOfFinancingsInput) {
	      createSourceOfFinancing(input: $input) {
	          source_of_financing_id
	      }
  	}`,

  	deleteSourceOfFinancing: `mutation deleteSingleSourceOfFinancing($sourceOfFinancingId: Int!) {
	      deleteSourceOfFinancing(source_of_financing_id: $sourceOfFinancingId) {
	          source_of_financing_id
	      }
  	}`,

  	allInvestment: `query getAllInvestment {
	    investments {
	        investment_id
	        report_id
	        detail
	        value
	    }
  	}`,

  	addInvestment: `mutation createSingleInvestment($input:InvestmentsInput) {
	      createInvestment(input: $input) {
	          investment_id
	      }
  	}`,

  	deleteInvestment: `mutation deleteSingleInvestment($investmentId: Int!) {
	      deleteInvestment(investment_id: $investmentId) {
	          investment_id
	      }
  	}`,

  	allOtherFinance: `query getAllOtherFinance {
	    investments {
	        other_finance_id
	        report_id
	        detail
	        value
	    }
  	}`,

  	addOtherFinance: `mutation createSingleOtherFinance($input:OtherFinancesInput) {
	      createOtherFinance(input: $input) {
	          other_finance_id
	      }
  	}`,

  	deleteOtherFinance: `mutation deleteSingleOtherFinance($otherFinanceId: Int!) {
	      deleteOtherFinance(other_finance_id: $otherFinanceId) {
	          other_finance_id
	      }
  	}`,

  	allAssumption: `query getAllAssumption {
	    assumptions {
	    	assumption_id
	        report_id
	        currency
	        unit_rate
	        detail
	        volume_unit
	        volume_value
	        price_value
	        cutoff_grade_value
	        cutoff_grade_unit
	    }
  	}`,

  	addAssumption: `mutation createSingleAssumption($input:AssumptionsInput) {
	      createAssumption(input: $input) {
	          assumption_id
	      }
  	}`,

  	deleteAssumption: `mutation deleteSingleAssumption($assumptionId: Int!) {
	      deleteAssumption(assumption_id: $assumptionId) {
	          assumption_id
	      }
  	}`,

  	allReportProcurement: `query getAllReportProcurement {
	    report_procurements {
    		report_procurement_id
	      	user_id
	      	year
	      	term
	      	report_type
	      	approved
	      	flagged_for_deletion
	    }
  	}`,

  	addReportProcurement: `mutation createSingleReportProcurement($input:ReportProcurementsInput) {
	      createReportProcurement(input: $input) {
	          report_procurement_id
	      }
  	}`,

  	deleteReportProcurement: `mutation deleteSingleReportProcurement($reportProcurementId: Int!) {
	      deleteReportProcurement(report_procurement_id: $reportProcurementId) {
	          report_procurement_id
	      }
  	}`,

  	allProcurement: `query getAllProcurement {
	    procurements {
    		procurements_id
		    report_procurement_id
		    detail
		    specification
		    unit_price
		    category
		    country_of_origin
		    province_of_origin
		    district_of_origin
		    city_of_origin
		    project_area
		    tkdn
	    }
  	}`,

  	addProcurement: `mutation createSingleProcurement($input:ProcurementsInput) {
	      createProcurement(input: $input) {
	          procurements_id
	      }
  	}`,

  	deleteProcurement: `mutation deleteSingleProcurement($procurementId: Int!) {
	      deleteProcurement(procurements_id: $procurementId) {
	          procurements_id
	      }
  	}`,
}

export default query;