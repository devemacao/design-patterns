import BookingRepository from "./BookingRepository";

export default class CancelBooking {
  constructor(readonly bookingRepository: BookingRepository) {}

  async execute(code: string): Promise<void> {
    const booking = await this.bookingRepository.getBookingByCode(code);
    booking.cancel();
    await this.bookingRepository.update(booking);
  }
}
