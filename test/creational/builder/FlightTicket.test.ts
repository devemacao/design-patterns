import FlightTicket from "../../../src/creational/builder/FlightTicket";
import FlightTicketBuilder from "../../../src/creational/builder/FlightTicketBuilder";

test("Deve criar uma passagem aérea", function () {
  const builder = new FlightTicketBuilder()
    .setFlight("Azul", "9876")
    .setTrip("FLN", "GRU")
    .setPassenger("John Doe", "jhon.doe@teste.com", "111.111.111-11", "M")
    .setEmergencyContact("Bob Simpson", "5511999999999")
    .setCheckinInformation(true, "1", "4A")
    .setSeat("8A")
    .setCheckedBags(2)
    .setPriority(5);
  const flightTicket = new FlightTicket(builder);
  expect(flightTicket.passengerName).toBe("John Doe");
});
