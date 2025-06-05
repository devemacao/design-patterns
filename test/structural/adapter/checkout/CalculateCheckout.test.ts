import CalculateCheckout from "../../../../src/structural/adapter/checkout/CalculateCheckout";
import { CatalogGatewayHttp } from "../../../../src/structural/adapter/checkout/CatalogGateway";
import {
  AxiosAdapter,
  FetchAdapter,
} from "../../../../src/structural/adapter/checkout/HttpClient";

test("Deve calcular o checkout", async () => {
  const input = {
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 2 },
      { productId: 3, quantity: 3 },
    ],
  };
  const httpClient = new AxiosAdapter();
  const catalogGateway = new CatalogGatewayHttp(httpClient);
  const calculateCheckout = new CalculateCheckout(catalogGateway);
  const output = await calculateCheckout.execute(input);
  expect(output.total).toBe(1400);
});
