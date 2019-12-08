<template lang="pug">
.container-fluid.h-100
  #login.card.col-lg-6.col-xl-3.h-100.ml-auto
    .card-body
      router-link(to='/')
        img.mt-3.mb-2.mx-auto.d-block.shadow-img(src='@/assets/img/sikembarlogo.svg')
      .card.shadow-nohover
        .card-body
          h6.card-title.text-center.font-weight-bold Masuk SIKEMBAR
          form(@submit.prevent="submit")
            .form-group
              label.col-form-label-sm.font-weight-bold(for='akunPengguna') Akun Pengguna
              input#akunPengguna.form-control.form-control-sm(type='text'
                aria-describedby='penjelasanAkun' placeholder='Masukan nama akun'
                v-model.trim.lazy="$v.username.$model"
                :class="{ 'is-invalid': $v.username.$error }" )
              p.error(v-if="!$v.username.numeric") Gunakan format akun pengguna yang benar.
              p.error(v-if="!$v.username.minLength")
                | Minimum {{$v.username.$params.minLength.min}} karakter.
            .form-group
              label.col-form-label-sm.font-weight-bold(for='sandiPengguna') Kata Sandi
              input#sandiPengguna.form-control.form-control-sm(type='password'
                v-model.trim.lazy="$v.password.$model"
                placeholder='Kata Sandi' :class="{ 'is-invalid': $v.password.$error }")
              p.error(v-if="!$v.password.minLength")
                | Minimum {{$v.password.$params.minLength.min}} karakter,
                | dan kombinasi antara angka, huruf, dan simbol.
            p#disclaimer *) Dengan menekan tombol "Kirim", anda telah menyetujui
              router-link(to='/about')  ketentuan yang berlaku
              | .
            button.btn-block.btn.btn-primary.btn-sm(type='submit'
              :disabled="submitStatus === 'PENDING'") Kirim
            p.typo.success.pt-2(v-if="submitStatus === 'OK'") Sukses masuk.
            p.typo.error.pt-2(v-if="submitStatus === 'ERROR'") Mohon isi formulir dengan tepat.
            p.typo.wait.pt-2(v-if="submitStatus === 'PENDING'") Mengirimkan data.
      router-link.nav-link(to='/') Kembali ke Beranda
    .card-footer.row.align-items-center
      small.font-weight-bold Bimus Mineral 4.0
      img.ml-auto(src='@/assets/img/logo-esdm.gif')
</template>

<script>
import { required, minLength, numeric } from 'vuelidate/lib/validators';
import address from '@/address';

export default {
  data() {
    return {
      username: '',
      password: '',
      submitStatus: null,
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(4),
      numeric,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  methods: {
    submit() {
      console.log('submit!');
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        // do your submit logic here
        this.axios.post(address + ':3000/login-user', {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          this.submitStatus = 'PENDING';
          setTimeout(() => {
            if(response.data.token) {
              this.submitStatus = 'OK';
              this.$session.start();
              this.$session.set('user', response.data.response);
              document.cookie = "token=" + response.data.token;
              document.cookie = "user_session=" + this.$session.get('user').user_id;
              localStorage.setItem('user_role', this.$session.get('user').role);
              this.$router.push('/profile/' + response.data.response.username);
            }
            else {
              this.submitStatus = 'ERROR';
            }
          }, 500);
        });
      }
    },
  },
};
</script>

<style scoped>
#login{
  border-radius: 0;
  background: rgba(255,255,255,0.5);
  border-top:0;
  border-bottom:0;
  border-color:rgba(0,0,0,0.3);
}

#login > .card-body{
  padding:0;
}

#login .card-footer{
  border:0;
  border-radius:0;
}

#login .card-footer small{
  color:#1E375C;
}

label{
  color:#707070;
}

#login img{
  width: 7rem;
}

a.nav-link{
  padding:0.5rem 0rem;
  font-size:0.8rem;
  vertical-align: middle;
  color:#1E375C;
}

#login .card-footer img{
  width: 3.5rem;
}

.btn-primary{
  background-color:#1E375C;
  border-color: #725e41;
  transition: color .15s ease-in-out,
  background-color .15s ease-in-out,
  border-color .15s ease-in-out,
  box-shadow .15s ease-in-out,
  -webkit-box-shadow .15s ease-in-out;
}

.btn-primary:not(:disabled):not(.disabled):active{
  background-color:#9e8665;
  border-color: #c0a37a;
}

.btn-primary:not(:disabled):not(.disabled):active:focus, .btn-primary.focus, .btn-primary:focus{
  box-shadow: none;
}

.card-title{
  font-weight:600;
}

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

.typo {
  font-size:0.7rem;
}

#disclaimer{
  font-size:0.6rem;
  margin-bottom:0;
}
</style>
