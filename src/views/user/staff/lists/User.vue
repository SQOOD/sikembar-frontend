<template lang='pug'>
  .container.mt-4
    h1.pb-2 Daftar Pengguna
    vue-good-table(
    :columns='columns'
    :rows='users'
    @on-cell-click='onCellClick'
    :pagination-options='{ enabled: true, perPage: 10 }'
    :search-options='{ enabled: true, placeholder: "Ketik Pencarian" }'
    )
      template(slot="table-actions")
        .dropdown
          a#dropdownMenuLink.btn.btn-sm.btn-secondary.dropdown-toggle.mr-2(
            href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          ) Filter Kolom
          .dropdown-menu(aria-labelledby="dropdownMenuButton")
            div(v-for='(column, index) in columns' :key='index')
                a.dropdown-item(href='#' tabindex='-1'
                  @click.prevent='toggleColumn( index, $event )')
                  input.mr-2(disabled :checked='!column.hidden' type='checkbox')
                  small {{column.label}}
      template(slot='table-row' slot-scope='props')
        span.font-weight-bold(v-if='props.column.field == "username"')
          | {{props.row.username}}
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'user',
  apollo: {
    users: {
      query: gql`query User{
        users{
          username
          role
          commodity
          company_type
          company_name
          npwp
          wiup
          email
          phone
          address
          company_permission
        }
      }`,
    },
  },
  data() {
    return {
      users: [],
      columns: [
        {
          label: 'Aksi',
          field: 'aksi',
        },
        {
          label: 'Akun Pengguna',
          field: 'username',
        },
        {
          label: 'Tipe Pengguna',
          field: 'role',
          filterOptions: {
            enabled: true,
            placeholder: ' ',
            filterDropdownItems: ['ADMIN', 'MINER', 'EVALUATOR', 'VENDOR', 'SUPERINTENDENT'],
          },
        },
        {
          label: 'Komoditas',
          field: 'commodity',
          hidden: true,
        },
        {
          label: 'Tipe',
          field: 'company_type',
          hidden: true,
        },
        {
          label: 'Perusahaan',
          field: 'company_name',
          hidden: true,
        },
        {
          label: 'Tipe Izin',
          field: 'company_permission',
          hidden: true,
        },
        {
          label: 'NPWP',
          field: 'npwp',
          hidden: true,
        },
        {
          label: 'WIUP',
          field: 'wiup',
          hidden: true,
        },
        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'Telepon',
          field: 'phone',
        },
        {
          label: 'Alamat',
          field: 'address',
        },
      ],
    };
  },
  methods: {
    onCellClick(params) {
      if (params.column.field === 'username') {
        if (params.row.role === 'MINER') {
          this.$router.push(`/admin/${this.$route.params.userName}/view-user/miner/${params.row.username}`);
        } else if (params.row.role === 'VENDOR') {
          this.$router.push(`/admin/${this.$route.params.userName}/view-user/vendor/${params.row.username}`);
        } else {
          this.$router.push(`/admin/${this.$route.params.userName}/view-user/staff/${params.row.username}`);
        }
      }
    },
    toggleColumn(index) {
      // Set hidden to inverse of what it currently is
      this.$set(this.columns[index], 'hidden', !this.columns[index].hidden);
    },
  },
};
</script>

<style scoped>
  h1{
    font-size: 1.5rem;
    font-weight: 600;
    color:#333;
    border-bottom:1px solid #fee50e;
  }
</style>
