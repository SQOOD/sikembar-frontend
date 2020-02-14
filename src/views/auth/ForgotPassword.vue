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
              label.col-form-label-sm.font-weight-bold(for='akunPengguna') Akun Pengguna
              input#akunPengguna.form-control.form-control-sm(type='text'
                aria-describedby='penjelasanAkun' placeholder='Masukan nama akun'
                v-model.trim.lazy="$v.username.$model"
                :class="{ 'is-invalid': $v.username.$error }" )
              p.error(v-if="!$v.username.alphaNum") Gunakan format akun pengguna yang benar.
              p.error(v-if="!$v.username.minLength")
                | Minimum {{$v.username.$params.minLength.min}} karakter.
              label.col-form-label-sm.font-weight-bold(for='email') Email
              input#email.form-control.form-control-sm(type='text'
                aria-describedby='email' placeholder='Masukan email'
                v-model.trim.lazy="$v.email.$model"
                :class="{ 'is-invalid': $v.username.$error }")
              p.error(v-if="!$v.email.email") Gunakan format email yang benar.
            vue-recaptcha(
              ref='recaptcha'
              sitekey='6LdQJdUUAAAAAF9qTawLsQYbElLyWldo_wTGUdHL'
              size='invisible'
              @verify='onVerified'
              :loadRecaptchaScript="true")
            button.btn-block.btn.btn-primary.btn-sm(type='submit'
              :disabled="submitStatus === 'PENDING'") KIRIM KATA SANDI BARU
            p.typo.success.pt-2(v-if="submitStatus === 'OK'") Email telah dikirimkan.
            p.typo.error.pt-2(v-if="submitStatus === 'ERROR'") Mohon isi formulir dengan tepat.
            p.typo.wait.pt-2(v-if="submitStatus === 'PENDING'") Mengirimkan data.
</template>

<script>
import {
  alphaNum,
  required,
  minLength,
  email,
} from 'vuelidate/lib/validators';
import gql from 'graphql-tag';
import VueRecaptcha from 'vue-recaptcha';

export default {
  data() {
    return {
      submitStatus: null,
      username: '',
      email: '',
    };
  },
  components: {
    'vue-recaptcha': VueRecaptcha,
  },
  validations: {
    username: {
      required,
      minLength: minLength(8),
      alphaNum,
    },
    email: {
      required,
      email,
    },
  },
  methods: {
    async submit() {
      console.log('submit!');
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        this.$refs.recaptcha.execute();
        this.submitStatus = 'PENDING';
      }
    },
    onVerified(recaptchaToken) {
      this.$apollo.mutate({
        mutation: gql`mutation($username: String!, $email: String!, $recaptchaToken: String!){
          forgotpassword(username:$username, email:$email, recaptchaToken:$recaptchaToken){
            accessToken
            result
          }
        }`,
        variables: {
          username: this.username,
          email: this.email,
          recaptchaToken,
        },
      }).then(() => {
      // Result
        this.submitStatus = 'OK';
      }).catch((error) => {
        // Error
        console.error(error);
        this.submitStatus = 'ERROR';
      });
    },
  },
};
</script>

<style scoped>
.typo{
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
