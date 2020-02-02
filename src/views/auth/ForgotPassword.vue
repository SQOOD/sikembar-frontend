<template lang="pug">
.container
  .row.pt-3
    .col-4.mx-auto
      .card
        .card-header
          h4.text-center Lupa Kata Sandi
        .card-body
          form(@submit.prevent="submit")
            .form-group
              label.col-form-label-sm.font-weight-bold(for='sandiPengguna') Tipe Pengguna
              v-select(:options='options' v-model='role')
              label.col-form-label-sm.font-weight-bold(for='akunPengguna') Akun Pengguna
              input#akunPengguna.form-control.form-control-sm(type='text'
                aria-describedby='penjelasanAkun' placeholder='Masukan nama akun'
                v-model.trim.lazy="$v.username.$model"
                :class="{ 'is-invalid': $v.username.$error }" )
              p.error(v-if="!$v.username.alphaNum") Gunakan format akun pengguna yang benar.
              p.error(v-if="!$v.username.minLength")
                | Minimum {{$v.username.$params.minLength.min}} karakter.
            button.btn-block.btn.btn-primary.btn-sm(type='submit'
              :disabled="submitStatus === 'PENDING'") BUAT PENGGUNA
            p.typo.success.pt-2(v-if="submitStatus === 'OK'") Sukses masuk.
            p.typo.error.pt-2(v-if="submitStatus === 'ERROR'") Mohon isi formulir dengan tepat.
            p.typo.wait.pt-2(v-if="submitStatus === 'PENDING'") Mengirimkan data.
</template>

<script>
import {
  alphaNum,
  required,
  minLength,
} from 'vuelidate/lib/validators';
import gql from 'graphql-tag';

export default {
  data() {
    return {
      username: '',
      submitStatus: null,
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(8),
      alphaNum,
    },
  },
  methods: {
    async submit() {
      console.log('submit!');
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        this.submitStatus = 'PENDING';
        console.log('submitting');
        // await this.$recaptchaLoaded();
        // do your submit logic here
        this.$apollo.mutate({
          mutation: gql`mutation(
            $username: String!,
            $password: String!,
            $role: String!,
            $commodity: Commodity = NOT_AVAILABLE,
            $phone: String,
            $company_type: CompanyType = NOT_AVAILABLE,
            $company_name: String,
            $company_permission: CompanyPermission = MINERBA,
            $npwp: String,
            $address: String,
            $wiup: String,
            $email: String,
            ){
            signup(
              username: $username,
              password: $password,
              role: $role,
              commodity: $commodity,
              phone: $phone,
              company_type: $company_type,
              company_name: $company_name,
              company_permission: $company_permission,
              npwp: $npwp,
              address: $address,
              wiup: $wiup,
              email: $email,
            ){
              user{
                username
              }
            }
          }`,
          variables: {
            username: this.username,
            password: this.password,
            role: this.role,
            commodity: this.commodity,
            phone: this.phone,
            company_type: this.company_type,
            company_name: this.company_name,
            company_permission: this.company_permission,
            npwp: this.npwp,
            address: this.address,
            wiup: this.wiup,
            email: this.email,
          },
        }).then(() => {
        // Result
          this.submitStatus = 'OK';
          this.$router.push(`/admin/${localStorage.getItem('ares')}/profile`);
        }).catch((error) => {
          // Error
          console.error(error);
          this.submitStatus = 'ERROR';
        });
      }
    },
  },
};
</script>

<style scoped>
.error{
  color:#dc3545;
  font-size:0.7rem;
  line-height:1.1;
  margin-top:0.3rem;
}

.success {
  color:#0d770d;
}

.wait {
  color:#e0d754;
}
</style>
