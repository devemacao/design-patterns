import Checkin from "../../../src/behavioral/strategy/Checkin";
import Checkout from "../../../src/behavioral/strategy/Checkout";
import { ParkingTicketRepositoryDatabse } from "../../../src/behavioral/strategy/ParkingTicketRepository";

test("Deve calcular a tarifa do veículo estacionado no aeroporto", async () => {
  const plate = `AAA${Math.random() * 1000}`.padStart(4, "0");
  const parkingTicketRepository = new ParkingTicketRepositoryDatabse();
  const checkin = new Checkin(parkingTicketRepository);
  const inputCheckin = {
    plate,
    checkinDate: new Date("2023-03-01T10:00:00"),
    location: "airport",
  };
  await checkin.execute(inputCheckin);
  const checkout = new Checkout(parkingTicketRepository);
  const inputCheckout = {
    plate,
    checkoutDate: new Date("2023-03-01T12:00:00"),
  };
  const output = await checkout.execute(inputCheckout);
  expect(output.fare).toBe(20);
});

test("Deve calcular a tarifa do veículo estacionado no shopping", async () => {
  const plate = `AAA${Math.random() * 1000}`.padStart(4, "0");
  const parkingTicketRepository = new ParkingTicketRepositoryDatabse();
  const checkin = new Checkin(parkingTicketRepository);
  const inputCheckin = {
    plate,
    checkinDate: new Date("2023-03-01T10:00:00"),
    location: "shopping",
  };
  await checkin.execute(inputCheckin);
  const checkout = new Checkout(parkingTicketRepository);
  const inputCheckout = {
    plate,
    checkoutDate: new Date("2023-03-01T15:00:00"),
  };
  const output = await checkout.execute(inputCheckout);
  expect(output.fare).toBe(30);
});

test("Deve calcular a tarifa do veículo estacionado na praia", async () => {
  const plate = `AAA${Math.random() * 1000}`.padStart(4, "0");
  const parkingTicketRepository = new ParkingTicketRepositoryDatabse();
  const checkin = new Checkin(parkingTicketRepository);
  const inputCheckin = {
    plate,
    checkinDate: new Date("2023-03-01T10:00:00"),
    location: "beach",
  };
  await checkin.execute(inputCheckin);
  const checkout = new Checkout(parkingTicketRepository);
  const inputCheckout = {
    plate,
    checkoutDate: new Date("2023-03-01T17:00:00"),
  };
  const output = await checkout.execute(inputCheckout);
  expect(output.fare).toBe(10);
});

test("Deve calcular a tarifa do veículo estacionado na rua", async () => {
  const plate = `AAA${Math.random() * 1000}`.padStart(4, "0");
  const parkingTicketRepository = new ParkingTicketRepositoryDatabse();
  const checkin = new Checkin(parkingTicketRepository);
  const inputCheckin = {
    plate,
    checkinDate: new Date("2023-03-01T10:00:00"),
    location: "public",
  };
  await checkin.execute(inputCheckin);
  const checkout = new Checkout(parkingTicketRepository);
  const inputCheckout = {
    plate,
    checkoutDate: new Date("2023-03-01T17:00:00"),
  };
  const output = await checkout.execute(inputCheckout);
  expect(output.fare).toBe(10);
});
