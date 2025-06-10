import Usecase from "./Usecase";

export default class SecurityDecorator implements Usecase {
  constructor(readonly usecase: Usecase) {}

  execute(input: any): Promise<any> {
    console.log("security");
    return this.usecase.execute(input);
  }
}
