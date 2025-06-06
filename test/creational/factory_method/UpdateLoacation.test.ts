import CalculateFare from "../../../src/creational/factory_method/CalculateFare";
import Ride, {
  DistanceRide,
  TimeRide,
} from "../../../src/creational/factory_method/Ride";
import { RideRepositoryMemory } from "../../../src/creational/factory_method/RideRepository";
import { SegmentRepositoryMemory } from "../../../src/creational/factory_method/SegmentRepository";
import UpdateLocation from "../../../src/creational/factory_method/UpdateLocation";

test("Deve atualizar a localização de uma corrida por distância", async () => {
  const rideRepository = new RideRepositoryMemory();
  const segmentRepository = new SegmentRepositoryMemory();
  const ride = DistanceRide.create(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-03-01T10:00:00")
  );
  rideRepository.save(ride);
  const updateLoacation = new UpdateLocation(rideRepository, segmentRepository);
  const input = {
    rideId: ride.rideId,
    lat: -27.496887588317275,
    long: -48.522234807851476,
    date: new Date("2021-03-01T12:00:00"),
  };
  await updateLoacation.execute(input);
  const calculateFare = new CalculateFare(rideRepository, segmentRepository);
  const output = await calculateFare.execute(ride.rideId);
  expect(output.fare).toEqual(40);
});

test("Deve atualizar a localização de uma corrida por tempo", async () => {
  const rideRepository = new RideRepositoryMemory();
  const segmentRepository = new SegmentRepositoryMemory();
  const ride = TimeRide.create(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-03-01T10:00:00")
  );
  rideRepository.save(ride);
  const updateLoacation = new UpdateLocation(rideRepository, segmentRepository);
  const input = {
    rideId: ride.rideId,
    lat: -27.496887588317275,
    long: -48.522234807851476,
    date: new Date("2021-03-01T12:00:00"),
  };
  await updateLoacation.execute(input);
  const calculateFare = new CalculateFare(rideRepository, segmentRepository);
  const output = await calculateFare.execute(ride.rideId);
  expect(output.fare).toEqual(120);
});
