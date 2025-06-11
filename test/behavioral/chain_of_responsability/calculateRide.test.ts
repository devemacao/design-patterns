import { calculateFare } from "../../../src/behavioral/chain_of_responsability/calculateRide";

test("Deve calcular o valor de uma corrida com tarifa mínima", () => {
  const segments = [{ distance: 2, date: new Date("2021-03-01T10:00:00") }];
  const fare = calculateFare(segments);
  expect(fare).toBe(10);
});
test("Deve calcular o valor da corrida no horário normal", () => {
  const segments = [
    {
      distance: 10,
      date: new Date("2021-03-01T10:00:00"),
    },
  ];

  const fare = calculateFare(segments);
  expect(fare).toBe(21);
});

test("Deve calcular o valor da corrida no horário noturno", () => {
  const segments = [
    {
      distance: 10,
      date: new Date("2021-03-01T23:00:00"),
    },
  ];
  const fare = calculateFare(segments);
  expect(fare).toBe(39);
});

test("Deve calcular o valor da corrida no horário de domingo", () => {
  const segments = [
    {
      distance: 10,
      date: new Date("2021-03-07T10:00:00"),
    },
  ];
  const fare = calculateFare(segments);
  expect(fare).toBe(29);
});

test("Deve calcular o valor da corrida no horário de domingo a noite", () => {
  const segments = [
    {
      distance: 10,
      date: new Date("2021-03-07T23:00:00"),
    },
  ];
  const fare = calculateFare(segments);
  expect(fare).toBe(50);
});

test("Não deve calcular o valor da corrida se a distância for inválida", () => {
  const segments = [{ distance: null, date: new Date("2021-03-01T10:00:00") }];
  expect(() => calculateFare(segments)).toThrow(new Error("Invalid distance"));
});

test("Não deve calcular o valor da corrida se a data for inválida", () => {
  const segments = [{ distance: 10, date: new Date("2021-0 3-01T10:00:00") }];
  expect(() => calculateFare(segments)).toThrow(new Error("Invalid date"));
});
