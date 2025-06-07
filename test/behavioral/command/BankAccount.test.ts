import BankAccount from "../../../src/behavioral/command/BankAccount";
import { TransferCommand } from "../../../src/behavioral/command/TransferCommand";

test("Deve fazer uma transferência entre duas contas", function () {
  const bankAccountA = new BankAccount(1);
  const bankAccountB = new BankAccount(2);
  expect(bankAccountA.getBalance()).toBe(0);
  expect(bankAccountB.getBalance()).toBe(0);
  bankAccountA.debit(100);
  bankAccountB.credit(100);
  expect(bankAccountA.getBalance()).toBe(-100);
  expect(bankAccountB.getBalance()).toBe(100);
});

test("Deve fazer uma transferência entre duas contas usando um comando", function () {
  const fromBankAccount = new BankAccount(1);
  const toBankAccount = new BankAccount(2);
  const transferCommand = new TransferCommand(
    fromBankAccount,
    toBankAccount,
    100
  );
  transferCommand.execute();
  expect(fromBankAccount.getBalance()).toBe(-100);
  expect(toBankAccount.getBalance()).toBe(100);
});
