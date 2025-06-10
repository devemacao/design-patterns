import pgp from "pg-promise";
import Booking from "./Booking";

export default interface BookingRepository {
  save(booking: Booking): Promise<void>;
  getBookingByCode(code: string): Promise<Booking>;
  update(booking: Booking): Promise<void>;
}

export class BookingRepositoryDatabase implements BookingRepository {
  async save(booking: Booking): Promise<void> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    await connection.query(
      "insert into design_patterns.bookings (code, room_id, email, checkin_date, checkout_date, duration, price, status) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        booking.code,
        booking.roomId,
        booking.email,
        booking.checkinDate,
        booking.checkoutDate,
        booking.duration,
        booking.price,
        booking.getStatus(),
      ]
    );
    connection.$pool.end();
  }
  async getBookingByCode(code: string): Promise<Booking> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [bookingData] = await connection.query(
      "select * from design_patterns.bookings where code = $1",
      [code]
    );
    connection.$pool.end();
    if (!bookingData) throw new Error("Booking not found");
    return new Booking(
      bookingData.code,
      bookingData.room_id,
      bookingData.email,
      bookingData.checkin_date,
      bookingData.checkout_date,
      bookingData.duration,
      parseFloat(bookingData.price),
      bookingData.status
    );
  }

  async update(booking: Booking): Promise<void> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    await connection.query(
      "update design_patterns.bookings set status = $1 where code = $2",
      [booking.getStatus(), booking.code]
    );
    await connection.$pool.end();
  }
}
