<template lang="pug">
.container
  .row.pt-3
    .col-4.mx-auto
      .card
        .card-header
          h4.text-center Buat Pengguna Baru
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
              label.col-form-label-sm.font-weight-bold(for='Telepon') Telepon
              input#Telepon.form-control.form-control-sm(type='text'
                aria-describedby='Telepon' placeholder='Masukan telepon'
                v-model.trim.lazy="$v.phone.$model"
                :class="{ 'is-invalid': $v.phone.$error }" )
              p.error(v-if="!$v.phone.numeric") Gunakan format telepon yang benar.
              p.error(v-if="!$v.phone.minLength")
                | Minimum {{$v.phone.$params.minLength.min}} karakter.
              label.col-form-label-sm.font-weight-bold(for='email') EMAIL
              input#email.form-control.form-control-sm(type='text'
                aria-describedby='email' v-model='email' placeholder='EMAIL')
              p.error(v-if="!$v.email.email") Gunakan format email yang benar.
              label.col-form-label-sm.font-weight-bold(for='wiup' v-show='role === "MINER"') WIUP
              .input-group(for='wiup' v-show='role === "MINER"')
                input#akunPengguna.form-control.form-control-sm(type='text'
                  aria-describedby='wiup' placeholder='Masukan WIUP'
                  v-model.trim.lazy="$v.wiup.$model"
                  :class="{ 'is-invalid': $v.wiup.$error }" )
                .input-group-append
                  button.btn-block.btn.btn-primary.btn-sm(type='button' @click='fill_data'
                  :disabled="submitStatus === 'PENDING'") Isi Data
                  p.typo.success.pt-2(v-if="WIUPStatus === 'OK'") Sukses.
                  p.typo.error.pt-2(v-if="WIUPStatus === 'ERROR'") Data tidak ada
                  p.typo.wait.pt-2(v-if="WIUPStatus === 'PENDING'") Mengirimkan data.
              p.error(v-if="!$v.wiup.numeric") Gunakan format akun pengguna yang benar.
              p.error(v-if="!$v.wiup.minLength")
                | Minimum {{$v.wiup.$params.minLength.min}} karakter.
              fieldset(disabled v-show='role === "MINER"')
                label.col-form-label-sm.font-weight-bold(for='tipeDanNamaPerusahaan')
                  | Nama dan Tipe Perusahaan
                .input-group#tipeDanNamaPerusahaan
                  input#tipePerusahaan.form-control.form-control-sm(type='text'
                    v-model='company_type')
                  input#namaPerusahaan.form-control.form-control-sm(type='text'
                    v-model='company_name')
                label.col-form-label-sm.font-weight-bold(for='izinPerusahaan') Izin Perusahaan
                input#izinPerusahaan.form-control.form-control-sm(type='text'
                  aria-describedby='izinPerusahaan' placeholder='Izin Perusahaan'
                  v-model='company_permission' )
                label.col-form-label-sm.font-weight-bold(for='npwp') NPWP
                input#npwp.form-control.form-control-sm(type='text'
                  aria-describedby='npwp' v-model='npwp' placeholder='NPWP')
                label.col-form-label-sm.font-weight-bold(for='alamat') Alamat Perusahaan
                textarea#alamat.form-control.form-control-sm(type='text'
                  aria-describedby='address' v-model='address' placeholder='Alamat Perusahaan')
              fieldset(v-show='role === "SUPPLIER"')
                label.col-form-label-sm.font-weight-bold(for='tipeDanNamaPerusahaan')
                  | Nama dan Tipe Perusahaan
                .input-group#tipeDanNamaPerusahaan
                  input#tipePerusahaan.form-control.form-control-sm(type='text'
                    v-model='company_type')
                  input#namaPerusahaan.form-control.form-control-sm(type='text'
                    v-model='company_name')
                label.col-form-label-sm.font-weight-bold(for='npwp') NPWP
                input#npwp.form-control.form-control-sm(type='text'
                  aria-describedby='npwp' v-model='npwp' placeholder='NPWP')
                label.col-form-label-sm.font-weight-bold(for='alamat') Alamat Perusahaan
                textarea#alamat.form-control.form-control-sm(type='text'
                  aria-describedby='address' v-model='address' placeholder='Alamat Perusahaan')
            vue-recaptcha(
              ref='recaptcha'
              sitekey='6LdQJdUUAAAAAF9qTawLsQYbElLyWldo_wTGUdHL'
              size='invisible'
              @verify='onVerified'
              :loadRecaptchaScript="true")
            button.btn-block.btn.btn-primary.btn-sm(type='submit'
              :disabled="submitStatus === 'PENDING'") BUAT PENGGUNA
            p.typo.success.pt-2(v-if="submitStatus === 'OK'") Sukses masuk.
            p.typo.error.pt-2(v-if="submitStatus === 'ERROR'") Mohon isi formulir dengan tepat.
            p.typo.wait.pt-2(v-if="submitStatus === 'PENDING'") Mengirimkan data.
</template>

<script>
import {
  required,
  minLength,
  numeric,
  alphaNum,
  email,
} from 'vuelidate/lib/validators';
import gql from 'graphql-tag';
import VueRecaptcha from 'vue-recaptcha';
import crypto from 'crypto';

export default {
  data() {
    return {
      data_role: '',
      username: '',
      password: '',
      repeatPassword: '',
      company_permission: '',
      role: '',
      commodity: '',
      wiup: '',
      npwp: '',
      email: '',
      phone: '',
      company_type: '',
      company_name: '',
      address: '',
      submitStatus: null,
      WIUPStatus: null,
      options: ['ADMIN', 'EVALUATOR', 'SUPERINTENDENT', 'MINER', 'SUPPLIER'],
      company_options: ['CV', 'PT'],
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(8),
      alphaNum,
    },
    wiup: {
      minLength: minLength(8),
      numeric,
    },
    phone: {
      required,
      minLength: minLength(8),
      numeric,
    },
    email: {
      required,
      email,
    },
  },
  methods: {
    fill_data() {
      this.axios.get(`/v1/moms?kode_wiup=${this.wiup}`).then((response) => {
        this.address = response.data.perusahaan.alamat_perusahaan;
        this.company_permission = response.data.perusahaan.perizinan[0].jenis_izin;
        this.company_name = response.data.perusahaan.nama_perusahaan;
        this.npwp = response.data.perusahaan.npwp;
        this.commodity = response.data.perusahaan.perizinan[0].komoditas;
        this.company_type = response.data.perusahaan.tipe_perusahaan;
      });
    },
    async submit() {
      console.log('submit!');
      if (this.role === 'ADMIN' || this.role === 'SUPERINTENDENT' || this.role === 'EVALUATOR') {
        this.company_type = 'NOT_AVAILABLE';
      }
      if (this.role !== 'MINER') {
        this.commodity = 'NOT_AVAILABLE';
      }
      if (this.role === 'SUPPLIER') {
        this.company_permission = 'SUPPLIER';
      } else if (this.role === 'ADMIN' || this.role === 'SUPERINTENDENT' || this.role === 'EVALUATOR') {
        this.company_permission = 'MINERBA';
      }
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR';
      } else {
        this.submitStatus = 'PENDING';
        this.$refs.recaptcha.execute();
      }
    },
    onVerified(recaptchaToken) {
      console.log('submitting');
      const password = crypto.randomBytes(6).toString('hex');
      console.log(password);
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
          $recaptchaToken: String!
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
            recaptchaToken: $recaptchaToken
          ){
            user{
              username
            }
          }
        }`,
        variables: {
          username: this.username,
          password,
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
          recaptchaToken,
        },
      }).then(() => {
        // Result
        this.submitStatus = 'OK';
        this.$router.push(`/admin/${this.$cookies.get('apollo')}/profile`);
      }).catch((error) => {
        // Error
        console.error(error);
        this.submitStatus = 'ERROR';
      });
    },
  },
  components: {
    'vue-recaptcha': VueRecaptcha,
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
