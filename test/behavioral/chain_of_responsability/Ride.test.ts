import {
  NormalFareCalculator,
  OvernightFareCalculator,
  OvernightSundayFareCalculator,
  SundayFareCalculator,
} from "../../../src/behavioral/chain_of_responsability/FareCalculator";
import Ride from "../../../src/behavioral/chain_of_responsability/Ride";

let ride: Ride;
beforeEach(() => {
  const overnightSundayFareCalculator = new OvernightSundayFareCalculator();
  const sundayFareCalculator = new SundayFareCalculator(
    overnightSundayFareCalculator
  );
  const overnightFareCalculator = new OvernightFareCalculator(
    sundayFareCalculator
  );
  const normalFareCalculator = new NormalFareCalculator(
    overnightFareCalculator
  );
  ride = new Ride(normalFareCalculator);
});
test("Deve calcular o valor da corrida em horário normal", () => {
  ride.addSegment(10, new Date("2021-03-01T10:00:00"));
  ride.calculateFare();
  expect(ride.getFare()).toBe(21);
});

test("Deve calcular o valor da corrida em horário noturno", () => {
  ride.addSegment(10, new Date("2021-03-01T23:00:00"));
  ride.calculateFare();
  expect(ride.getFare()).toBe(39);
});

test("Deve calcular o valor da corrida em horário normal no domingo", () => {
  ride.addSegment(10, new Date("2021-03-07T10:00:00"));
  ride.calculateFare();
  expect(ride.getFare()).toBe(29);
});

test("Deve calcular o valor da corrida em horário noturno no domingo", () => {
  ride.addSegment(10, new Date("2021-03-07T23:00:00"));
  ride.calculateFare();
  expect(ride.getFare()).toBe(50);
});

test("Deve calcular o valor da corrida com tarifa mínima", () => {
  ride.addSegment(2, new Date("2021-03-01T10:00:00"));
  ride.calculateFare();
  expect(ride.getFare()).toBe(10);
});

test("Não deve calcular o valor da corrida com distância inválida", () => {
  expect(() => ride.addSegment(0, new Date("2021-03-01T10:00:00"))).toThrow(
    new Error("Invalid distance")
  );
});

test("Não deve calcular o valor da corrida com data inválida", () => {
  expect(() => ride.addSegment(10, new Date("2021-03-0 1T10:00:00"))).toThrow(
    new Error("Invalid date")
  );
});
