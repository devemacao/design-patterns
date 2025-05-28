import Coord from "../../../src/creational/factory_method/Coord";

test("Não deve criar uma coordenada com latitude inválida.", () => {
  expect(() => new Coord(-90.1, 180)).toThrow(new Error("Invalid latitude"));
  expect(() => new Coord(90.1, -180)).toThrow(new Error("Invalid latitude"));
});

test("Não deve criar uma coordenada com longitude inválida.", () => {
  expect(() => new Coord(-90, 180.1)).toThrow(new Error("Invalid longitude"));
  expect(() => new Coord(90, -180.1)).toThrow(new Error("Invalid longitude"));
});

test("Deve criar uma corrdenada com latitude e longitude válidas.", () => {
  const firstCoord = new Coord(90.0, 180.0);
  expect(firstCoord.lat).toEqual(90.0);
  expect(firstCoord.long).toEqual(180.0);
  const secondCoord = new Coord(-90.0, -180.0);
  expect(secondCoord.lat).toEqual(-90.0);
  expect(secondCoord.long).toEqual(-180.0);
});
