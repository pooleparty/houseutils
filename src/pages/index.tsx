import * as React from 'react';
import MortgageInfoComparison from '../components/MortgageInfoComparison';
import MortgageInfoContainer from '../components/MortgageInfoContainer';
import Page from '../components/Page';
import IndexLayout from '../layouts';

const IndexPage = () => (
  <IndexLayout>
    <Page>
      <MortgageInfoComparison />
      <MortgageInfoContainer />
    </Page>
  </IndexLayout>
);

export default IndexPage;
