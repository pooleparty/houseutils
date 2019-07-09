import { observable, reaction, autorun } from 'mobx';
import MortgageInfo from './MortgageInfo';
import AffordabilityModel from './AffordabilityModel';

const LS_PREFIX = 'houseutils:';
const getLSItem = (key: string) => {
  return localStorage.getItem(LS_PREFIX + key);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setLSItem = (key: string, obj: any) => {
  return localStorage.setItem(LS_PREFIX + key, JSON.stringify(obj));
};

function saveMortgageInfo(mortgageInfo: MortgageInfo[]) {
  return setLSItem('mortgageInfos', mortgageInfo.map(i => i.asJson));
}

function saveAffordabilityModel(affordabilityModel: AffordabilityModel) {
  return setLSItem('affordabilityModel', affordabilityModel);
}

export class AppState {
  @observable
  public mortgageInfos: MortgageInfo[] = [];

  @observable
  public affordabilityModel: AffordabilityModel;

  public constructor() {
    this.mortgageInfos = this.loadMortgageInfo();
    this.affordabilityModel = this.loadAffordabilityModel();

    reaction(
      () => this.mortgageInfos.map(i => i),
      mortgageInfo => {
        saveMortgageInfo(mortgageInfo);
      },
    );
    autorun(() => {
      saveAffordabilityModel(this.affordabilityModel);
    });
  }

  private loadMortgageInfo() {
    const infos: MortgageInfo[] = JSON.parse(getLSItem('mortgageInfos') || '[]');
    return infos.map(i => MortgageInfo.from(this, i));
  }

  /* eslint-disable class-methods-use-this */
  private loadAffordabilityModel() {
    let affordabilityModel = new AffordabilityModel();
    const json = getLSItem('affordabilityModel');
    if (json) {
      const parsed: AffordabilityModel = JSON.parse(json);
      affordabilityModel = new AffordabilityModel(parsed.monthlyGrossIncome, parsed.downPayment, parsed.monthlyDebts);
    }
    return affordabilityModel;
  }

  public getMortgageInfos() {
    return this.mortgageInfos;
  }

  public addMortgageInfo = () => {
    const newMortgageInfo = new MortgageInfo(this);
    this.mortgageInfos.push(newMortgageInfo);
    return newMortgageInfo;
  };

  public saveMortgageInfo(mortgageInfo: MortgageInfo) {
    const idIndex = this.mortgageInfos.findIndex(mi => mi.getId() === mortgageInfo.getId());
    if (idIndex > -1) {
      this.mortgageInfos[idIndex].update(mortgageInfo);
    }
    saveMortgageInfo(this.mortgageInfos);
    this.mortgageInfos = [...this.mortgageInfos];
  }

  public removeMortgageInfo(mortgageInfo: MortgageInfo) {
    const i = this.mortgageInfos.findIndex(info => info.getId() === mortgageInfo.getId());
    if (i >= 0) {
      this.mortgageInfos.splice(i, 1);
      mortgageInfo.dispose();
    }
  }
}
