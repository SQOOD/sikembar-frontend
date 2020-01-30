<template lang="pug">
  .container.mt-4
    h1.pb-2 Rekap Perusahaan
    span(v-html ='reportFinances')
</template>

<script>
/* eslint-disable */
import gql from 'graphql-tag';
import { jsonToHTML } from 'nested-json-to-table';
import $ from 'jquery';
import _ from 'lodash';
import { bootstrapTable } from 'bootstrap-table';

class Builder {
  constructor () {
    this.indent = 0
  }
 
  table (next) {
    this._wrap('table', next)
  }
}

export default {
  apollo:{
    reportFinances: {
      query: gql` query reportFinances($username: String!){
        reportFinances(where: {user: {username: {equals: $username}}}){
          year
          rate
          report_type
          assumption{
            rate
            detail
            volume_value
            volume_unit
            price
            cut_off
            cut_off_unit
            currency
          }
          balance{
            value
            detail
            category
            sub_category
          }
          budgets{
            value
            detail
          }
          capital_budget{
            value
            detail
          }
          cashflow{
            value
            category
            detail
          }
          cost_of_good{
            value
            detail
          }
          fuel{
            rate
            price
            currency
          }
          investment{
            value
            detail
          }
          lost_profit{
            value
            detail
            category
          }
          other_finance{
            detail
            value
          }
          operation_cost{
            value
            detail
          }
          royalty{
            value
            detail
          }
          state_revenue{
            value
            detail
            category
          }
          source_of_funding{
            value
            detail
          }
        }
      }`,
      variables: {
        username: 'perusahaan1',
      },
      update(data) {
        data = jsonToHTML(data.reportFinances);
        
        return data;
      },
    },
  },  
  name: 'rekap',
  components: {
  },
  data() {
    return {
      requestDone : false,
      meta: {
        "order": [
          "year",
          "rate",
          "report_type",
          "assumption",
          "balance",
          "budgets",
          "capital_budget",
          "cashflow",
          "cost_of_good",
          "fuel",
          "investment",
          "lost_profit",
          "other_finance",
          "operation_cost",
          "royalty",
          "state_revenue",
          "source_of_funding",
        ],
        "mapping": {
          "year": {
            "title": "year"
          },
          "rate": {
            "title": "rate"
          },
          "assumption": {
            "title": "assumption",
            "meta": {
              "order": [
                "rate",
                "detail",
                "volume_value",
                "volume_unit",
                "price",
                "cut_off",
                "cut_off_unit",
                "currency",
              ],
              "mapping": {
                "rate": {
                  "title": "rate"
                },
                "detail": {
                  "title": "detail"
                },
                "volume_value": {
                  "title": "volume_value"
                },
                "volume_unit": {
                  "title": "volume_unit"
                },
                "price": {
                  "title": "price"
                },
                "cut_off": {
                  "title": "cut_off"
                },
                "cut_off_unit": {
                  "title": "cut_off_unit"
                },
                "currency": {
                  "title": "currency"
                },
              },
            },
          },
          "balance": {
            "title": "balance",
            "meta": {
              "order": [
                "value",
                "detail",
                "category",
                "sub_category",
              ],
              "mapping": {
                "value": {
                  "title": "value"
                },
                "detail": {
                  "title": "detail"
                },
                "category": {
                  "title": "category"
                },
                "sub_category": {
                  "title": "sub_category"
                },
              },
            },
          },
          "budgets": {
            "title": "budgets",
            "meta": {
              "order": [
                "value",
                "detail",
              ],
              "mapping": {
                "value": {
                  "title": "value"
                },
                "detail": {
                  "title": "detail"
                },
              },
            },
          },
          "capital_budget": {
            "title": "capital_budget",
            "meta": {
              "order": [
                "value",
                "detail",
              ],
              "mapping": {
                "value": {
                  "title": "value"
                },
                "detail": {
                  "title": "detail"
                },
              },
            },
          },
          "cashflow": {
            "title": "cashflow",
            "meta": {
              "order": [
                "value",
                "category",
                "detail",
              ],
              "mapping": {
                "value": {
                  "title": "value"
                },
                "category": {
                  "title": "category"
                },
                "detail": {
                  "title": "detail"
                },
              },
            }
          },
          "cost_of_good": {
            "title": "cost_of_good",
            "meta": {
              "order": [
                "value",
                "detail",
              ],
              "mapping": {
                "value": {
                  "title": "value"
                },
                "detail": {
                  "title": "detail"
                },
              },
            },
          },
          "fuel": {
            "title": "fuel",
            "meta": {
              "order": [
                "rate",
                "price",
                "currency",
              ],
              "mapping": {
                "rate": {
                  "title": "rate"
                },
                "price": {
                  "title": "price"
                },
                "currency": {
                  "title": "currency"
                },
              },
            },
          },
          "investment": {
            "title": "investment",
            "meta": {
              "order": [
                "value",
                "detail",
              ],
              "mapping": {
                "value": {
                  "title": "value"
                },
                "detail": {
                  "title": "detail"
                },
              },
            },
          },
          "lost_profit": {
            "title": "lost_profit",
            "meta": {
              "order": [
                "value",
                "detail",
                "category",
              ],
              "mapping": {
                "value": {
                  "title": "value"
                },
                "detail": {
                  "title": "detail"
                },
                "category": {
                  "title": "category"
                },
              },
            },
          },
          "other_finance": {
            "title": "other_finance",
            "meta": {
              "order": [
                "detail",
                "value",
              ],
              "mapping": {
                "detail": {
                  "title": "detail"
                },
                "value": {
                  "title": "value"
                },
              },
            },
          },
          "operation_cost": {
            "title": "operation_cost",
            "meta": {
              "order": [
                "value",
                "detail",
              ],
              "mapping": {
                "value": {
                  "title": "value"
                },
                "detail": {
                  "title": "detail"
                },
              },
            },
          },
          "royalty": {
            "title": "royalty",
            "meta": {
              "order": [
                "value",
                "detail",
              ],
              "mapping": {
                "value": {
                  "title": "value"
                },
                "detail": {
                  "title": "detail"
                },
              },
            },
          },
          "state_revenue": {
            "title": "state_revenue",
            "meta": {
              "order": [
                "value",
                "detail",
                "category",
              ],
              "mapping": {
                "value": {
                  "title": "value"
                },
                "detail": {
                  "title": "detail"
                },
                "category": {
                  "title": "category"
                },
              },
            },
          },
          "source_of_funding": {
            "title": "source_of_funding",
            "meta": {
              "order": [
                "value",
                "detail",
              ],
              "mapping": {
                "value": {
                  "title": "value"
                },
                "detail": {
                  "title": "detail"
                },
              },
            },
          },
        },
      },
    };
  },
  beforeUpdate: function() {
    this.$nextTick(() => {
      $('table').bootstrapTable({
        pagination: true,
        search: true,
        showColumns: true,
        stickyHeader: true,
      });
    });
  },
};
</script>

<style scoped>
  @import url('../../../../node_modules/bootstrap-table/dist/bootstrap-table.min.css');
</style>
