import BankAccountRepository from "./BankAccountRepository";
import { TransferCommand } from "./TransferCommand";

export default class MakeTransfer {
  constructor(readonly bankAccountRepository: BankAccountRepository) {}

  async execute(input: Input): Promise<void> {
    const fromBankAccount = await this.bankAccountRepository.getById(
      input.fromBankAccountId
    );
    const toBankAccount = await this.bankAccountRepository.getById(
      input.toBankAccountId
    );
    const transferCommand = new TransferCommand(
      fromBankAccount,
      toBankAccount,
      input.amount
    ).execute();
    await this.bankAccountRepository.update(fromBankAccount);
    await this.bankAccountRepository.update(toBankAccount);
  }
}

type Input = {
  fromBankAccountId: number;
  toBankAccountId: number;
  amount: number;
};
