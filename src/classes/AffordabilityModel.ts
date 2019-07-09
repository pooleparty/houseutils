import { computed, observable, reaction, action } from 'mobx';

function pv_pmt(f_rate, f_years, f_fv, f_pmt, f_ppy) {
  let f_pv = 0;
  let denom = 1;
  const f_int = f_rate / 100 / f_ppy;
  const factor = Number(1) + Number(f_int);

  let pmt_pv = 0;
  const pmt_fact = 0;
  const f_npr = f_years * f_ppy;

  for (let i = 0; i < f_npr; i++) {
    denom *= factor;

    pmt_pv = f_pmt / denom;

    f_pv = Number(f_pv) + Number(pmt_pv);
  }

  return f_pv;
}

const avergageInterestRate = 0.04;

function computePV(c: number, numPayments: number, apr: number) {
  const rate = apr / 12;
  return Math.floor(c * ((1 - (1 + rate) ** -numPayments) / rate));
}

export default class AffordabilityModel {
  @observable
  public monthlyGrossIncome: number;

  @observable
  public downPayment: number;

  @observable
  public monthlyDebts: number;

  public constructor(monthlyGrossIncome: number = 0, downPayment: number = 0, monthlyDebts: number = 0) {
    this.monthlyGrossIncome = monthlyGrossIncome;
    this.downPayment = downPayment;
    this.monthlyDebts = monthlyDebts;
  }

  @computed
  public get ratio1() {
    return Math.floor(this.monthlyGrossIncome * 0.28);
  }

  @computed
  public get ratio2() {
    return Math.floor(this.monthlyGrossIncome * 0.36);
  }

  @computed
  private get pv1() {
    return computePV(this.ratio1, 360, avergageInterestRate);
  }

  @computed
  private get pv2() {
    return computePV(this.ratio2 - this.monthlyDebts, 360, avergageInterestRate);
  }

  @computed
  public get pv() {
    return this.downPayment + Math.min(this.pv1, this.pv2);
  }

  @computed
  public get toJSON() {
    return {
      monthlyGrossIncome: this.monthlyGrossIncome,
      downPayment: this.downPayment,
      monthlyDebts: this.monthlyDebts,
      ratio1: this.ratio1,
      ratio2: this.ratio2,
      pv1: this.pv1,
      pv2: this.pv2,
      pv: this.pv,
    };
  }
}
