import InstallmentRepository, {
  InstallmentRepositoryMemory,
} from "./installmentRepository";
import LoanRepository, { LoanRepositoryMemory } from "./LoanRepository";

export default interface RepositoryFactory {
  createLoanRepository(): LoanRepository;
  createInstallmentRepository(): InstallmentRepository;
}

export class RepositoryFactoryMemory implements RepositoryFactory {
  createLoanRepository(): LoanRepository {
    return LoanRepositoryMemory.getInstance();
  }
  createInstallmentRepository(): InstallmentRepository {
    return InstallmentRepositoryMemory.getInstance();
  }
}
