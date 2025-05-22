import {
  PriceInstallmentCalculator,
  SACInstallmentCalculator,
} from "../../../src/creational/abstract_factory/InstallmentCalculator";
import { MortgageLoan } from "../../../src/creational/abstract_factory/Loan";

test("Deve calcular as parcelas utilizando SAC", function () {
  const installmentCalculator = new SACInstallmentCalculator();
  const loan = MortgageLoan.create(100000, 10000, 240);
  const installments = installmentCalculator.calculate(loan);
  expect(installments).toHaveLength(240);
  expect(installments.at(0)?.number).toEqual(1);
  expect(installments.at(0)?.amount).toEqual(1250);
  expect(installments.at(0)?.amortization).toEqual(416.67);
  expect(installments.at(0)?.interest).toEqual(833.33);
  expect(installments.at(0)?.balance).toEqual(99583.33);
  expect(installments.at(239)?.number).toEqual(240);
  expect(installments.at(239)?.amount).toEqual(420.14);
  expect(installments.at(239)?.amortization).toEqual(416.67);
  expect(installments.at(239)?.interest).toEqual(3.47);
  expect(installments.at(239)?.balance).toEqual(0);
});

test("Deve calcular as parcelas utilizando PRICE", function () {
  const installmentCalculator = new PriceInstallmentCalculator();
  const loan = MortgageLoan.create(100000, 10000, 240);
  const installments = installmentCalculator.calculate(loan);
  expect(installments).toHaveLength(240);
  expect(installments.at(0)?.number).toEqual(1);
  expect(installments.at(0)?.amount).toEqual(965.02);
  expect(installments.at(0)?.amortization).toEqual(131.69);
  expect(installments.at(0)?.interest).toEqual(833.33);
  expect(installments.at(0)?.balance).toEqual(99868.31);
  expect(installments.at(239)?.number).toEqual(240);
  expect(installments.at(239)?.amount).toEqual(965.02);
  expect(installments.at(239)?.amortization).toEqual(957.03);
  expect(installments.at(239)?.interest).toEqual(7.99);
  expect(installments.at(239)?.balance).toEqual(0);
});
