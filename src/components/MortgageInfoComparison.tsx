import * as React from 'react';
import { observer } from 'mobx-react';
import { Table, Column, Index } from 'react-virtualized';
import classNames from 'classnames';
import { formatCurrency } from '../utils';
import appContext from '../appContext';
import { AppState } from '../classes/AppState';
import mortgageInfoComparisonStyles from './MortgageInfoComparison.module.scss';

const MortgageInfoComparison: React.SFC = () => {
  const appState: AppState = React.useContext(appContext);

  if (!appState) {
    return null;
  }

  const { mortgageInfos } = appState;

  return (
    <Table
      width={1000}
      autoWidth
      height={300}
      headerHeight={20}
      rowHeight={30}
      rowCount={mortgageInfos.length}
      rowGetter={({ index }) => mortgageInfos[index]}
      rowClassName={(info: Index) => {
        return classNames({ [mortgageInfoComparisonStyles.editing]: info.index >= 0 && mortgageInfos[info.index].editing });
      }}
    >
      <Column
        width={200}
        label="APR"
        dataKey="interestRate"
        cellRenderer={({ cellData }) => {
          return `${(Number(cellData) * 100).toFixed(2)}%`;
        }}
      ></Column>
      <Column
        width={200}
        label="Terms in months"
        dataKey="term"
        cellRenderer={({ cellData }) => {
          return cellData;
        }}
      ></Column>
      <Column
        width={200}
        label="Principal"
        dataKey="principal"
        cellRenderer={({ cellData }) => {
          return formatCurrency(cellData);
        }}
      ></Column>
      <Column
        width={200}
        label="Monthly Payment"
        dataKey="monthlyPayment"
        cellRenderer={({ cellData }) => {
          return formatCurrency(cellData);
        }}
      ></Column>
      <Column
        width={200}
        label="Monthly PMI"
        dataKey="monthlyMortgageInsurancePayment"
        cellRenderer={({ cellData }) => {
          return formatCurrency(cellData);
        }}
      ></Column>
      <Column
        width={200}
        label="Total Payment"
        dataKey="totalPayments"
        cellRenderer={({ cellData }) => {
          return formatCurrency(cellData);
        }}
      ></Column>
      <Column
        width={200}
        label="Total Interest"
        dataKey="totalInterest"
        cellRenderer={({ cellData }) => {
          return formatCurrency(cellData);
        }}
      ></Column>
    </Table>
  );
};

export default observer(MortgageInfoComparison);
// https://localhost.us/vp/ns/cart/confirmed.aspx?alt_order_id=WL01D-2A325-5N7&signalCookie=&xnid=nextBtn&origin=4&rd=2
