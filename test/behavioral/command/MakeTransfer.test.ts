import BankAccount from "../../../src/behavioral/command/BankAccount";
import { BankAccountRepositoryMemory } from "../../../src/behavioral/command/BankAccountRepository";
import GetBalance from "../../../src/behavioral/command/GetBalance";
import MakeTransfer from "../../../src/behavioral/command/MakeTransfer";

test("Deve fazer uma transferência bancária", async () => {
  const bankAccountRepository = new BankAccountRepositoryMemory();
  const makeTransfer = new MakeTransfer(bankAccountRepository);
  bankAccountRepository.save(new BankAccount(1));
  bankAccountRepository.save(new BankAccount(2));
  const input = {
    fromBankAccountId: 1,
    toBankAccountId: 2,
    amount: 100,
  };
  await makeTransfer.execute(input);
  const getBalance = new GetBalance(bankAccountRepository);
  const outputA = await getBalance.execute(1);
  const outputB = await getBalance.execute(2);
  expect(outputA.balance).toBe(-100);
  expect(outputB.balance).toBe(100);
});
