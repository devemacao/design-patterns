import ParkingTicket from "../../../src/behavioral/strategy/ParkingTicket";

test("Deve calcular a tarifa do veículo estacionado no aeroporto", () => {
  const parkingTicket = new ParkingTicket(
    "AAA-1234",
    new Date("2025-01-01T10:00:00"),
    "airport"
  );
  parkingTicket.checkout(new Date("2025-01-01T12:00:00"));
  expect(parkingTicket.fare).toBe(20);
});
