import * as React from 'react';
import AffordabilityCalculator from '../components/AffordabilityCalculator';
import Page from '../components/Page';
import IndexLayout from '../layouts';

const AffordabilityPage = () => (
  <IndexLayout>
    <Page>
      <AffordabilityCalculator />
    </Page>
  </IndexLayout>
);

export default AffordabilityPage;
