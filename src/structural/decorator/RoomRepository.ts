import pgp from "pg-promise";
import Room from "./Room";

export default interface RoomRepository {
  getAvailableRoomByPeriodAndCategory(
    checkinDate: Date,
    checkoutDate: Date,
    category: string
  ): Promise<Room[]>;

  getById(roomId: number): Promise<Room>;
}

export class RoomRepositoryDatabase implements RoomRepository {
  async getAvailableRoomByPeriodAndCategory(
    checkinDate: Date,
    checkoutDate: Date,
    category: string
  ): Promise<Room[]> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const roomsData = await connection.query(
      "select * from design_patterns.rooms where category = $1 and status = 'available' and room_id not in (select room_id from design_patterns.bookings where (checkin_date, checkout_date) overlaps ($2, $3) and status = 'confirmed')",
      [category, checkinDate, checkoutDate]
    );
    await connection.$pool.end();
    const rooms: Room[] = [];
    for (const room of roomsData) {
      rooms.push(
        new Room(
          room.room_id,
          room.category,
          parseFloat(room.price),
          room.status
        )
      );
    }
    return rooms;
  }
  async getById(roomId: number): Promise<Room> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const [roomData] = await connection.query(
      "select * from design_patterns.rooms where room_id = $1",
      [roomId]
    );
    await connection.$pool.end();
    if (!roomData) throw new Error("Room not found");
    return new Room(
      roomData.room_id,
      roomData.category,
      parseFloat(roomData.price),
      roomData.status
    );
  }
}
