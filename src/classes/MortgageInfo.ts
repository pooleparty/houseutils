import { computed, observable, reaction, IReactionDisposer, action, autorun } from 'mobx';
import { createUUID, calculateMonthlyPMI, calculateMonthlyPayment } from '../utils';
import { MortgageInfoValues as IMortgageInfoValues } from '../components/MortgageInfoForm';
import { AppState } from './AppState';

export default class MortgageInfo {
  private id: string;

  private store: AppState;

  private autoSave = true;

  private saveHandler: IReactionDisposer;

  @observable
  public editing: boolean;

  @observable
  public interestRate: number;

  @observable
  public mortgageInsuranceRate: number;

  @observable
  public principal: number;

  @observable
  public term: number;

  public constructor(store: AppState) {
    this.store = store;
    this.id = createUUID();
    this.interestRate = 0.05;
    this.mortgageInsuranceRate = 0.003;
    this.principal = 200000;
    this.term = 360;
    this.editing = false;

    this.saveHandler = reaction(
      () => this.asJson,
      () => {
        if (this.autoSave) {
          console.log(`mortgageInfo ${this.id} reaction`);
          this.store.saveMortgageInfo(this);
        }
      },
    );

    // autorun(() => {
    //   console.log(this.asJson, arguments);
    // });
  }

  public static from(store: AppState, copy: MortgageInfo) {
    const mortgageInfo = new MortgageInfo(store);
    mortgageInfo.autoSave = false;
    mortgageInfo.id = copy.id;
    mortgageInfo.update(copy);
    mortgageInfo.autoSave = true;
    return mortgageInfo;
  }

  public getId() {
    return this.id;
  }

  public update(values: IMortgageInfoValues) {
    this.interestRate = values.interestRate;
    this.term = values.term;
    this.principal = values.principal;
    this.mortgageInsuranceRate = values.mortgageInsuranceRate;
  }

  public setEditing(editing: boolean) {
    this.editing = editing;
  }

  @computed
  public get monthlyPayment() {
    return calculateMonthlyPayment(this.interestRate, this.term, this.principal);
  }

  @computed
  public get monthlyMortgageInsurancePayment() {
    return calculateMonthlyPMI(this.mortgageInsuranceRate, this.principal);
  }

  @computed
  public get totalPayments() {
    return this.monthlyPayment * this.term;
  }

  @computed
  public get totalInterest() {
    return this.totalPayments - this.principal;
  }

  @computed
  public get asJson() {
    return {
      id: this.id,
      interestRate: this.interestRate,
      mortgageInsuranceRate: this.mortgageInsuranceRate,
      term: this.term,
      principal: this.principal,
      editing: this.editing,
    };
  }

  @action.bound
  public delete() {
    this.store.removeMortgageInfo(this);
  }

  public dispose() {
    this.saveHandler();
  }
}
