/* eslint-disable camelcase */
function checkUnit(item) {
  const x = (item === 'PRODUSEN') ? 'PRODUCER' : 'Supplier';
  return x;
}

const template3 = {
  detail: {
    path: 'Jenis Barang',
  },
  spec: {
    path: 'Spesifikasi',
  },
  volume_value: {
    path: 'Kuantitas',
    transform: val => parseInt(val, 10),
  },
  unit_price_type: {
    path: 'Tipe Pengadaan',
    // transform: val => ((val !== null) ? val.replace(/"(\w+)"/g, '$!') : val),
  },
  unit_price: {
    path: 'Harga Satuan',
    transform: val => parseInt(val, 10),
  },
  category: {
    path: 'Kategori',
    // transform: val => ((val !== null) ? val.replace(/"(\w+)"/g, '$!') : val),
  },
  project_area: {
    path: 'Area Pekerjaan',
    // transform: val => ((val !== null) ? val.replace(/"(\w+)"/g, '$!') : val),
  },
  country_of_origin: {
    path: 'Negara',
    // transform: val => ((val !== null) ? val.replace(/"(\w+)"/g, '$!') : val),
  },
  province_of_origin: {
    path: 'Provinsi',
    // transform: val => ((val !== null) ? val.replace(/"(\w+)"/g, '$!') : val),
  },
  tkdn_type: {
    path: 'Tipe TKDN',
    // transform: val => ((val !== null) ? val.replace(/"(\w+)"/g, '$!') : val),
  },
  tkdn: {
    path: 'TKDN',
    transform: val => parseInt(val, 10),
  },
  district_of_origin: {
    path: 'Kota / Kabupaten',
    // transform: val => ((val !== null) ? val.replace(/"(\w+)"/g, '$!') : val),
  },
  current_district: {
    path: 'Sesuai Lokasi',
    // transform: val => ((val !== null) ? val.replace(/"(\w+)"/g, '$!') : val),
  },
  vendor_type: {
    path: 'Produsen / Supplier',
    transform: val => checkUnit(val),
  },
};

export default template3;
