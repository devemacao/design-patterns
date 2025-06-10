import { BookingRepositoryDatabase } from "../../../src/structural/decorator/BookingRepository";
import BookingRoom from "../../../src/structural/decorator/BookingRoom";
import CancelBooking from "../../../src/structural/decorator/CancelBooking";
import GetBookingByCode from "../../../src/structural/decorator/GetBookingByCode";
import { RoomRepositoryDatabase } from "../../../src/structural/decorator/RoomRepository";

test("Deve reservar um quarto", async function () {
  const roomRepository = new RoomRepositoryDatabase();
  const bookingRepository = new BookingRepositoryDatabase();
  const bookingRoom = new BookingRoom(roomRepository, bookingRepository);
  const input = {
    email: "john.doe@teste.com",
    checkinDate: new Date("2021-03-01T10:00:00"),
    checkoutDate: new Date("2021-03-05T10:00:00"),
    category: "suite",
  };
  const outputBookingRoom = await bookingRoom.execute(input);
  const getBookingByCode = new GetBookingByCode(
    roomRepository,
    bookingRepository
  );
  const outputGgetBookinByCode = await getBookingByCode.execute(
    outputBookingRoom.code
  );
  expect(outputGgetBookinByCode.duration).toBe(4);
  expect(outputGgetBookinByCode.price).toBe(2000);
  const cancelBooking = new CancelBooking(bookingRepository);
  await cancelBooking.execute(outputGgetBookinByCode.code);
});
