import RoomRepository, {
  RoomRepositoryDatabase,
} from "../../../src/structural/decorator/RoomRepository";

test("Deve obter um quarto do repositório", async function () {
  const roomRepository = new RoomRepositoryDatabase();
  const room = await roomRepository.getById(1);
  expect(room.roomId).toBe(1);
  expect(room.category).toBe("suite");
  expect(room.price).toBe(500);
  expect(room.status).toBe("available");
});

test("Deve obter um quarto disponível para reserva em um período", async function () {
  const roomRepository = new RoomRepositoryDatabase();
  const [room] = await roomRepository.getAvailableRoomByPeriodAndCategory(
    new Date("2021-03-01T10:00:00"),
    new Date("2021-03-05T10:00:00"),
    "suite"
  );
  expect(room.roomId).toBe(1);
  expect(room.category).toBe("suite");
  expect(room.price).toBe(500);
  expect(room.status).toBe("available");
});

test("Nào deve obter um quarto disponível para reserva em um período", async function () {
  const roomRepository = new RoomRepositoryDatabase();
  const rooms = await roomRepository.getAvailableRoomByPeriodAndCategory(
    new Date("2021-03-11T12:00:00"),
    new Date("2021-03-12T10:00:00"),
    "suite"
  );
  expect(rooms).toHaveLength(0);
});
