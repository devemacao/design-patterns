import {
  CarLoan,
  MortgageLoan,
} from "../../../src/creational/abstract_factory/Loan";

test("Deve criar um financiamento imobiliário", function () {
  const loan = MortgageLoan.create(100000, 10000, 240);
  expect(loan.loanId).toBeDefined();
  expect(loan.amount).toEqual(100000);
  expect(loan.income).toEqual(10000);
  expect(loan.installments).toEqual(240);
});

test("Não deve criar um financiamento imobiliário com prazo superior a 420", function () {
  expect(() => MortgageLoan.create(100000, 10000, 450)).toThrow(
    new Error("The maximun number of installments for Mortgage loan is 430.")
  );
});

test("Não deve criar um financiamento caso a parcela ocupe um valor superior a 25% da renda mensal", function () {
  expect(() => MortgageLoan.create(200000, 1000, 420)).toThrow(
    new Error("The installment amount could not exceed 25% of monthly income.")
  );
});

test("Não deve criar um financiamento veicular com prazo superior a 60 meses", function () {
  expect(() => CarLoan.create(100000, 10000, 72)).toThrow(
    new Error("The maximun number of installments for Mortgage loan is 60.")
  );
});

test("Não deve criar um financiamento veicular caso a parcela ocupe um valor superior a 30% da renda mensal", function () {
  expect(() => CarLoan.create(200000, 1000, 60)).toThrow(
    new Error("The installment amount could not exceed 30% of monthly income.")
  );
});
