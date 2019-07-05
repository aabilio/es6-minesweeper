import model from '../model/index.js';

export const placeTest = ({ describe, it, expect }) => {
  describe("Place model", () => {
    it("should create a place not visible and without mines by default", () => {
      const place = model.place({});

      expect(place.visible).toEquals(false);
      expect(place.mine).toEquals(false);
    });

    it("should create places with autoincremental ids", () => {
      const place1 = model.place({});
      const place2 = model.place({});
      const place3 = model.place({});

      expect(place1.id < place2.id).toEquals(true);
      expect(place2.id < place3.id).toEquals(true);
    });
  });
};

export default placeTest;
