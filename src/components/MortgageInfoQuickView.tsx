import * as React from 'react';
import { observer } from 'mobx-react';
import { createViewModel } from 'mobx-utils';
import MortgageInfoForm, { MortgageInfoValues } from './MortgageInfoForm';
import { formatCurrency } from '../utils';
import MortgageInfo from '../classes/MortgageInfo';

interface MortgageInfoQuickViewProps {
  mortgageInfo: MortgageInfo;
}

const MortgageInfoQuickView: React.SFC<MortgageInfoQuickViewProps> = ({ mortgageInfo }) => {
  return (
    <table>
      <thead>
        <tr>
          <td colSpan={2}>
            <strong>Quick View</strong>
            <small>{mortgageInfo.getId()}</small>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Monthly Payment</td>
          <td>{formatCurrency(mortgageInfo.monthlyPayment)}</td>
        </tr>
        <tr>
          <td>Total Payments</td>
          <td>{formatCurrency(mortgageInfo.totalPayments)}</td>
        </tr>
        <tr>
          <td>Total Interest</td>
          <td>{formatCurrency(mortgageInfo.totalInterest)}</td>
        </tr>
        <tr>
          <td>Monthly Mortgage Insurance (PMI)</td>
          <td>{formatCurrency(mortgageInfo.totalInterest)}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default observer(MortgageInfoQuickView);
