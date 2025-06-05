import axios from "axios";

test("Deve consultar um produto no catálogo", async function () {
  const response = await axios.get("http://localhost:3001/products/1");
  const output = response.data;
  expect(output.productId).toBe(1);
  expect(output.description).toBe("A");
  expect(output.price).toBe(100);
});
