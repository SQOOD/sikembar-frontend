/* eslint-disable camelcase */
import cd from 'clean-deep';
import merge from 'array-object-merge';

function checkNullInt(item) {
  const x = (item != null) ? parseInt(item, 10) : item;
  return x;
}

const zip = function zip(ar1, ar2, zipper) {
  return zipper
    ? ar1.map((value, index) => zipper(value, ar2[index]))
    : ar1.map((value, index) => [value, ar2[index]]);
};

let last = null;

function changeNull(item) {
  const x = (item != null) ? last = item : last;
  return x;
}

function checkUnit(item) {
  const x = (item === '% / Persentase') ? 'PERSENTASE' : 'GPERTONNE';
  return x;
}

const template = {
  term: {
    path: 'Konfigurasi',
    transform: val => val.map(Konfigurasi => Konfigurasi.Termin).toString().toUpperCase(),
  },
  year: {
    path: 'Konfigurasi',
    transform: val => checkNullInt(val.map(Konfigurasi => Konfigurasi.Tahun)),
  },
  report_type: {
    path: 'Konfigurasi',
    transform: val => val.map(Konfigurasi => Konfigurasi.TipeLaporan).toString().toUpperCase(),
  },
  currency: {
    path: 'Konfigurasi',
    transform: val => val.map(Konfigurasi => Konfigurasi.MataUang).toString(),
  },
  rate: {
    path: 'Konfigurasi',
    transform: val => checkNullInt(val.map(Konfigurasi => Konfigurasi.Kurs)),
  },
  'budgets.create': {
    path: 'AnggaranBelanja',
    transform: val => cd(
      zip(
        val.map(AnggaranBelanja => AnggaranBelanja.Uraian),
        val.map(AnggaranBelanja => checkNullInt(AnggaranBelanja.Nilai)),
        (detail, value) => ({ detail, value }),
      ),
    ),
  },
  'capital_budget.create': {
    path: 'AnggaranBelanja',
    transform: val => cd(
      zip(
        val.map(AnggaranBelanja => AnggaranBelanja.UraianAnggaranBelanjaModal),
        val.map(AnggaranBelanja => checkNullInt(AnggaranBelanja.NilaiAnggaranBelanjaModal)),
        (detail, value) => ({ detail, value }),
      ),
    ),
  },
  'cashflow.create': {
    path: 'ArusKas',
    transform: val => merge(
      zip(
        val.map(ArusKas => ArusKas.Kategori).map(x => changeNull(x)),
        val.map(ArusKas => checkNullInt(ArusKas.Nilai)),
        (category, value) => ({ category, value }),
      ),
      zip(
        val.map(ArusKas => ArusKas.Uraian),
        val.map(ArusKas => checkNullInt(ArusKas.Nilai)),
        (detail, value) => ({ detail, value }),
      ), 'value',
    ),
  },
  'assumption.create': {
    path: 'AsumsiKeuangan',
    transform: val => merge(
      merge(
        merge(
          zip(
            val.map(AsumsiKeuangan => AsumsiKeuangan.Uraian),
            val.map(AsumsiKeuangan => AsumsiKeuangan.Satuan),
            (detail, volume_unit) => ({ detail, volume_unit }),
          ),
          zip(
            val.map(AsumsiKeuangan => AsumsiKeuangan.Uraian),
            val.map(AsumsiKeuangan => AsumsiKeuangan.MataUang),
            (detail, currency) => ({ detail, currency }),
          ), 'detail',
        ),
        merge(
          zip(
            val.map(AsumsiKeuangan => AsumsiKeuangan.Uraian),
            val.map(AsumsiKeuangan => checkNullInt(AsumsiKeuangan.Volume)),
            (detail, volume_value) => ({ detail, volume_value }),
          ),
          zip(
            val.map(AsumsiKeuangan => AsumsiKeuangan.Uraian),
            val.map(AsumsiKeuangan => checkUnit(AsumsiKeuangan.SatuanCutOffGrade)),
            (detail, cut_off_unit) => ({ detail, cut_off_unit }),
          ), 'detail',
        ),
      ),
      merge(
        zip(
          val.map(AsumsiKeuangan => AsumsiKeuangan.Uraian),
          val.map(AsumsiKeuangan => checkNullInt(AsumsiKeuangan.Kurs)),
          (detail, rate) => ({ detail, rate }),
        ),
        merge(
          zip(
            val.map(AsumsiKeuangan => AsumsiKeuangan.Uraian),
            val.map(AsumsiKeuangan => checkNullInt(AsumsiKeuangan.NilaiCutOffGrade)),
            (detail, cut_off) => ({ detail, cut_off }),
          ),
          zip(
            val.map(AsumsiKeuangan => AsumsiKeuangan.Uraian),
            val.map(AsumsiKeuangan => checkNullInt(AsumsiKeuangan.HargaJual)),
            (detail, price) => ({ detail, price }),
          ), 'detail',
        ), 'detail',
      ),
    ),
  },
  'fuel.create.currency': {
    path: 'AsumsiKeuangan',
    transform: val => val.map(AsumsiKeuangan => AsumsiKeuangan.MataUangBBM)
      .toString().slice(0, -1),
  },
  'fuel.create.price': {
    path: 'AsumsiKeuangan',
    transform: val => checkNullInt(val.map(AsumsiKeuangan => AsumsiKeuangan.NilaiBBM)),
  },
  'fuel.create.rate': {
    path: 'AsumsiKeuangan',
    transform: val => checkNullInt(val.map(AsumsiKeuangan => AsumsiKeuangan.Kurs)),
  },
  'cost_of_good.create': {
    path: 'HargaPokokPenjualan',
    transform: val => cd(
      zip(
        val.map(HargaPokokPenjualan => HargaPokokPenjualan.Uraian),
        val.map(HargaPokokPenjualan => checkNullInt(HargaPokokPenjualan.Nilai)),
        (detail, value) => ({ detail, value }),
      ),
    ),
  },
  'supplies.create': {
    path: 'HargaPokokPenjualan',
    transform: val => cd(
      zip(
        val.map(HargaPokokPenjualan => HargaPokokPenjualan.UraianPersediaan),
        val.map(HargaPokokPenjualan => checkNullInt(HargaPokokPenjualan.NilaiPersediaan)),
        (detail, value) => ({ detail, value }),
      ),
    ),
  },
  'investment.create': {
    path: 'Investasi',
    transform: val => cd(
      zip(
        val.map(Investasi => Investasi.Uraian),
        val.map(Investasi => checkNullInt(Investasi.Nilai)),
        (detail, value) => ({ detail, value }),
      ),
    ),
  },
  'other_finance.create': {
    path: 'KeuanganLainnya',
    transform: val => cd(
      zip(
        val.map(KeuanganLainnya => KeuanganLainnya.Uraian),
        val.map(KeuanganLainnya => checkNullInt(KeuanganLainnya.Nilai)),
        (detail, value) => ({ detail, value }),
      ),
    ),
  },
  'lost_profit.create': {
    path: 'LabaRugi',
    transform: val => cd(
      merge(
        zip(
          val.map(LabaRugi => LabaRugi.Uraian),
          val.map(LabaRugi => LabaRugi.Kategori).map(x => changeNull(x)),
          (detail, category) => ({ detail, category }),
        ),
        zip(
          val.map(LabaRugi => LabaRugi.Uraian),
          val.map(LabaRugi => checkNullInt(LabaRugi.Nilai)),
          (detail, value) => ({ detail, value }),
        ), 'detail',
      ),
    ),
  },
  'royalty.create': {
    path: 'LabaRugi',
    transform: val => cd(
      zip(
        val.map(LabaRugi => LabaRugi.UraianRoyalti),
        val.map(LabaRugi => checkNullInt(LabaRugi.NilaiRoyalti)),
        (detail, value) => ({ detail, value }),
      ),
    ),
  },
  'operation_cost.create': {
    path: 'LabaRugi',
    transform: val => cd(
      zip(
        val.map(LabaRugi => LabaRugi.UraianBebanOperasi),
        val.map(LabaRugi => checkNullInt(LabaRugi.NilaiBebanOperasi)),
        (detail, value) => ({ detail, value }),
      ),
    ),
  },
  'state_revenue.create': {
    path: 'PenerimaanNegara',
    transform: val => cd(
      merge(
        zip(
          val.map(PenerimaanNegara => PenerimaanNegara.Uraian),
          val.map(PenerimaanNegara => PenerimaanNegara.Kategori).map(x => changeNull(x)),
          (detail, category) => ({ detail, category }),
        ),
        zip(
          val.map(PenerimaanNegara => PenerimaanNegara.Uraian),
          val.map(PenerimaanNegara => checkNullInt(PenerimaanNegara.Nilai)),
          (detail, value) => ({ detail, value }),
        ), 'detail',
      ),
    ),
  },
  'balance.create': {
    path: 'NeracaKeuangan',
    transform: val => cd(
      merge(
        merge(
          zip(
            val.map(NeracaKeuangan => NeracaKeuangan.Uraian),
            val.map(NeracaKeuangan => NeracaKeuangan.Kategori).map(x => changeNull(x)),
            (detail, category) => ({ detail, category }),
          ),
          zip(
            val.map(NeracaKeuangan => NeracaKeuangan.Uraian),
            val.map(NeracaKeuangan => checkNullInt(NeracaKeuangan.Nilai)),
            (detail, value) => ({ detail, value }),
          ), 'detail',
        ),
        zip(
          val.map(NeracaKeuangan => NeracaKeuangan.Uraian),
          val.map(NeracaKeuangan => NeracaKeuangan.SubKategori).map(x => changeNull(x)),
          (detail, sub_category) => ({ detail, sub_category }),
        ), 'detail',
      ),
    ),
  },
  'source_of_funding.create': {
    path: 'SumberPembiayaan',
    transform: val => cd(
      zip(
        val.map(SumberPembiayaan => SumberPembiayaan.Uraian),
        val.map(SumberPembiayaan => checkNullInt(SumberPembiayaan.Nilai)),
        (detail, value) => ({ detail, value }),
      ),
    ),
  },
};

export default template;
