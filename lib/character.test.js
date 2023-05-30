import { Character } from "./models/Characters";

describe("Character", () => {
  test("should be a class", () => {
    expect(typeof new Character()).toEqual("function");
  });
  test("should set properties on instantiation", () => {
    const character = new Character("Bob", 10, 10, 10, 10, 10, 10, 10, 10);
    it("should set properties on instantiation", () => {
      expect(character.name).toEqual("Bob");
      expect(character.hp).toEqual(10);
      expect(character.mp).toEqual(10);
      expect(character.atk).toEqual(10);
      expect(character.def).toEqual(10);
      expect(character.spd).toEqual(10);
      expect(character.mag).toEqual(10);
      expect(character.res).toEqual(10);
      expect(character.luk).toEqual(10);
    });
  });
});
