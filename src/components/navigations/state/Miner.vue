<template lang="pug">
fragment
  li.nav-item
    router-link.nav-link(to='/logout') Keluar
  li.nav-item
    router-link.nav-link(:to="{ name: 'miner-profile'}") Profil Perusahaan
  li.nav-item
    router-link.nav-link(:to="{ name: 'miner-rekap'}") Rekap Perusahaan
</template>
