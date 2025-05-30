import Login from "../../../src/creational/singleton/Login";
import Signup from "../../../src/creational/singleton/Signup";
import { UserRepositoryMemory } from "../../../src/creational/singleton/UserRepository";

test("Deve criar uma conta de usuário", async () => {
  const signup = new Signup();
  const login = new Login();
  const inputSignup = {
    name: "John Doe",
    email: "john.doe@teste.com",
    password: "123456",
  };
  await signup.execute(inputSignup);
  const inputLogin = {
    email: "john.doe@teste.com",
    password: "123456",
  };
  const outputLogin = await login.execute(inputLogin);
  expect(outputLogin.success).toBe(true);
});
