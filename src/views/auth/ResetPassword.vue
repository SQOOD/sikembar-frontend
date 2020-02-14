<template lang="pug">
.container
  .row.pt-3
    .col-4.mx-auto
      .card
        .card-header
          h4.text-center Ubah Kata Sandi
        .card-body
          form(@submit.prevent="submit")
            .form-group
              label.col-form-label-sm.font-weight-bold(for='sandiPengguna') Kata Sandi Baru
              input#sandiPengguna.form-control.form-control-sm(type='password'
                v-model.trim.lazy="$v.password.$model"
                placeholder='Kata Sandi' :class="{ 'is-invalid': $v.password.$error }")
              p.error(v-if="!$v.password.minLength")
                | Minimum {{$v.password.$params.minLength.min}} karakter,
                | dan kombinasi antara angka dan huruf.
              label.col-form-label-sm.font-weight-bold(for='ulangSandiPengguna') Ulang Kata Sandi
              input#ulangSandiPengguna.form-control.form-control-sm(type='password'
                v-model.trim.lazy="$v.repeatPassword.$model"
                placeholder='Ulang Kata Sandi' :class="{ 'is-invalid': $v.repeatPassword.$error }")
              p.error(v-if="!$v.repeatPassword.sameAsPassword")
                | Harus identik dengan Kata Sandi.
            button.btn-block.btn.btn-primary.btn-sm(type='submit'
              :disabled="submitStatus === 'PENDING'") Ubah Kata Sandi
            p.typo.success.pt-2(v-if="submitStatus === 'OK'") Kata Sandi telah berubah.
            p.typo.error.pt-2(v-if="submitStatus === 'ERROR'") Mohon isi formulir dengan tepat.
            p.typo.wait.pt-2(v-if="submitStatus === 'PENDING'") Mengirimkan data.
</template>

<script>
import {
  required,
  minLength,
  sameAs,
} from 'vuelidate/lib/validators';
import gql from 'graphql-tag';
import { decode } from 'jsonwebtoken';
import { onLogout } from '../../vue-apollo';

export default {
  data() {
    return {
      submitStatus: null,
      password: '',
      repeatPassword: '',
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(8),
    },
    repeatPassword: {
      sameAsPassword: sameAs('password'),
    },
  },
  created() {
    const token = Object.keys(this.$route.query);
    this.$cookies.set('ares', token, '15min');
  },
  methods: {
    async submit() {
      console.log('submit!');
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        this.submitStatus = 'PENDING';
        const tokenData = decode(this.$cookies.get('ares'));
        const id = tokenData.userId;
        console.log(id);
        this.$apollo.mutate({
          mutation: gql`mutation($password: String!, $id: String!){
            updateOneUser(where:{id:$id}, data:{password:$password, approved:true}){
              id
            }
          }`,
          variables: {
            password: this.password,
            id,
          },
        }).then(() => {
        // Result
          this.submitStatus = 'OK';
          onLogout(this.$apollo.provider.defaultClient);
          setTimeout(
            () => { this.$router.push('/'); }, 3000,
          );
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
.typo, p.error{
  font-size:0.7rem;
}

.error{
  color:#dc3545;
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
