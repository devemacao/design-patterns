import BookingRepository from "./BookingRepository";
import RoomRepository from "./RoomRepository";

export default class GetBookingByCode {
  constructor(
    readonly rooomRepository: RoomRepository,
    readonly bookingRepository: BookingRepository
  ) {}
  async execute(code: string): Promise<Output> {
    const booking = await this.bookingRepository.getBookingByCode(code);
    const room = await this.rooomRepository.getById(booking.roomId);
    return {
      code: booking.code,
      category: room.category,
      duration: booking.duration,
      price: booking.price,
    };
  }
}

type Output = {
  code: string;
  category: string;
  duration: number;
  price: number;
};
