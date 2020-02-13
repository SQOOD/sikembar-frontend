<template lang='pug'>
  .container
    .row.mt-3
      .col-md-5
        profile-detail(
          :companyName= 'user.company_name',
          :permission= 'user.company_permission',
          :companyType= 'user.company_type',
          :address= 'user.address',
          :email= 'user.email',
          :npwp= 'user.npwp',
          :userName= 'user.wiup',
          :commodity= 'user.commodity',
        )
      .col-md-7
        file-pond(
          @addfile='uploadPicture'
          allowMultiple='true'
          dropOnPage='true'
          dropOnElement='false'
          maxFileSize='1MB'
          acceptedFileTypes='image/png, image/jpg, image/jpeg'
          labelIdle=`<img src='/img/order.3c2ea25c.svg'><h5 class="font-weight-bold">Jatuhkan \
          foto produk di halaman ini<br/><small>atau klik disini untuk mencari \
          berkas dalam komputer anda.</small>`)
</template>

<script>
import gql from 'graphql-tag';
import vueFilePond from 'vue-filepond';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

import ProfileDetail from '@/components/widgets/profile/Detail.vue';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

export default {
  data() {
    return {
      data: [],
      user: '',
    };
  },
  apollo: {
    user: {
      query: gql`query User($username: String!){
        user(where:{username:$username}){
          username
          role
          commodity
          company_type
          company_name
          npwp
          wiup
          email
          address
          company_permission
        }
      }`,
      variables() {
        return {
          username: this.$cookies.get('apollo'),
        };
      },
    },
  },
  components: {
    ProfileDetail,
    FilePond: vueFilePond(
      FilePondPluginValidateType,
      FilePondPluginImageValidateSize,
      FilePondPluginFileEncode,
      FilePondPluginImageTransform,
      FilePondPluginImagePreview,
    ),
  },
  methods: {
    uploadPicture(error, file) {
      const x = file.getFileEncodeDataURL();
      this.data.push(x);
      this.$apollo.query({
        query: gql`query{me{username}}`,
      }).then((me) => {
        const y = { user: { connect: { username: me.data.me.username } } };
        console.log(y);
        const z = this.data.map(o => o);
        console.log(z);
        // this.$apollo.mutate({
        //   mutation: gql`
        //   mutation($data: ReportGoodCreateInput!) {
        //     createOneReportGood(
        //       data:$data
        //     )
        //     {currency}
        //   }`,
        //   variables: {
        //     data: z,
        //   },
        // });
      });
    },
  },
};
</script>

<style scoped>
/deep/ .filepond--root img{
  width: 4.5rem;
}

/deep/ .filepond--root .filepond--drop-label{
  min-height:10rem
}

.filepond--wrapper{
  border:2px dashed #b7b7b7;
  color:#6d8671;
}

.filepond--drop-label{
  min-height: 15rem;
}
</style>
