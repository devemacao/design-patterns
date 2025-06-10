import { BookingRepositoryDatabase } from "../../../src/structural/decorator/BookingRepository";
import BookingRoom from "../../../src/structural/decorator/BookingRoom";
import CancelBooking from "../../../src/structural/decorator/CancelBooking";
import GetBookingByCode from "../../../src/structural/decorator/GetBookingByCode";
import ImportBooking from "../../../src/structural/decorator/ImportBooking";
import LogDecorator from "../../../src/structural/decorator/LogDecorator";
import { RoomRepositoryDatabase } from "../../../src/structural/decorator/RoomRepository";
import SecurityDecorator from "../../../src/structural/decorator/SecurityDecorator";

test("Deve importar uma lista de reservas", async function () {
  const roomRepository = new RoomRepositoryDatabase();
  const bookingRepository = new BookingRepositoryDatabase();
  const input = {
    file: `email;checkin_date;checkout_date;category;
    john.doe@teste.com;2021-03-01T10:00:00;2021-03-03T10:00:00;suite;
    john.doe@teste.com;2021-03-06T10:00:00;2021-03-08T10:00:00;suite;
    john.doe@teste.com;2021-03-20T10:00:00;2021-03-22T10:00:00;suite;`,
  };
  const bookingRoom = new BookingRoom(roomRepository, bookingRepository);
  const importBooking = new SecurityDecorator(
    new LogDecorator(new ImportBooking(bookingRoom))
  );
  const outputImportBooking = await importBooking.execute(input);
  const getBookingByCode = new GetBookingByCode(
    roomRepository,
    bookingRepository
  );
  for (const code of outputImportBooking.code) {
    const booking = await getBookingByCode.execute(code);
    expect(booking.duration).toBe(2);
    expect(booking.price).toBe(1000);
    const cancelBooking = new CancelBooking(bookingRepository);
    await cancelBooking.execute(booking.code);
  }
});
