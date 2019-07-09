/* eslint-disable no-bitwise */
export const createUUID = () => {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
export const formatCurrency = (number: number) => {
  return currencyFormatter.format(number);
};

function calculateMonthlyInterestRate(annualInterestRate: number) {
  return annualInterestRate / 12.0;
}

// P = L[c(1 + c)n]/[(1 + c)n - 1]
export function calculateMonthlyPayment(annualInterestRate: number, terms: number, principal: number) {
  const monthlyInterestRate = calculateMonthlyInterestRate(annualInterestRate);
  const numerator = principal * monthlyInterestRate;
  const denominator = 1 - 1 / (1 + monthlyInterestRate) ** terms;
  const monthlyPayment = numerator / denominator;
  return monthlyPayment;
}

export function calculateMonthlyPMI(annualMortgageInterestRate: number, principal: number) {
  const monthlyMortgageInsuranceRate = calculateMonthlyInterestRate(annualMortgageInterestRate);
  const monthlyPMIPayment = principal * monthlyMortgageInsuranceRate;
  return monthlyPMIPayment;
}

// B = L[(1 + c)n - (1 + c)p]/[(1 + c)n - 1]
export function calculateRemainingLoanBalance(annualInterestRate: number, terms: number, principal: number, numberOfMonths: number) {
  const monthlyInterestRate = calculateMonthlyInterestRate(annualInterestRate);
  const numerator = principal * ((1 + monthlyInterestRate) ** terms - (1 + monthlyInterestRate) ** numberOfMonths);
  const denominator = (1 + monthlyInterestRate) ** terms - 1;
  const balance = numerator / denominator;
  return balance;
}
