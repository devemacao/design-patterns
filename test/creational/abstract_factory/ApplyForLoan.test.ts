import ApplyForLoan from "../../../src/creational/abstract_factory/ApplyForLoan";
import GetLoan from "../../../src/creational/abstract_factory/GetLoan";
import { InstallmentRepositoryMemory } from "../../../src/creational/abstract_factory/installmentRepository";
import { MortgageLoanFactory } from "../../../src/creational/abstract_factory/LoanFactory";
import { LoanRepositoryMemory } from "../../../src/creational/abstract_factory/LoanRepository";
import { RepositoryFactoryMemory } from "../../../src/creational/abstract_factory/RepositoryFactory";

test("Deve solicitar um financiamento imobiliário", async () => {
  const repositoryFactory = new RepositoryFactoryMemory();
  const loanFactory = new MortgageLoanFactory();
  const apllyForLoan = new ApplyForLoan(repositoryFactory, loanFactory);
  const input = {
    amount: 100000,
    income: 10000,
    installments: 240,
  };
  const outputApplyForLoan = await apllyForLoan.execute(input);
  const getLoan = new GetLoan(repositoryFactory);
  const outputGetLoan = await getLoan.execute(outputApplyForLoan);
  expect(outputGetLoan.amount).toEqual(100000);
  expect(outputGetLoan.income).toEqual(10000);
  expect(outputGetLoan.installments).toHaveLength(240);
  expect(outputGetLoan.installments.at(0)?.number).toEqual(1);
  expect(outputGetLoan.installments.at(0)?.amount).toEqual(1250);
  expect(outputGetLoan.installments.at(0)?.amortization).toEqual(416.67);
  expect(outputGetLoan.installments.at(0)?.interest).toEqual(833.33);
  expect(outputGetLoan.installments.at(0)?.balance).toEqual(99583.33);
  expect(outputGetLoan.installments.at(239)?.number).toEqual(240);
  expect(outputGetLoan.installments.at(239)?.amount).toEqual(420.14);
  expect(outputGetLoan.installments.at(239)?.amortization).toEqual(416.67);
  expect(outputGetLoan.installments.at(239)?.interest).toEqual(3.47);
  expect(outputGetLoan.installments.at(239)?.balance).toEqual(0);
});
