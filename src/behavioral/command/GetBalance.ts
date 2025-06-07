import BankAccountRepository from "./BankAccountRepository";

export default class GetBalance {
  constructor(readonly bankAccountRepository: BankAccountRepository) {}

  async execute(bankAccountId: number): Promise<Output> {
    const existingBankAccount = await this.bankAccountRepository.getById(
      bankAccountId
    );
    const balance = existingBankAccount.getBalance();
    return {
      balance,
    };
  }
}

type Output = {
  balance: number;
};
