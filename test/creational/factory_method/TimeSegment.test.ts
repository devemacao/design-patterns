import Location from "../../../src/creational/factory_method/Location";
import { TimeSegment } from "../../../src/creational/factory_method/Segment";

test("Deve criar um segmento por tempo", () => {
  const fromLocation = new Location(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-03-01T10:00:00")
  );
  const toLocation = new Location(
    -27.496887588317275,
    -48.522234807851476,
    new Date("2021-03-01T12:00:00")
  );
  const timeSegment = new TimeSegment("", fromLocation, toLocation);
  expect(timeSegment.getDiffInMinutes()).toEqual(120);
});
