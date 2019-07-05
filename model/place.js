let PLACE_IDX = 0;

export const place = ({ id = null, visible = false, mine = false, nearMines = null }) => ({
  id: id || ++PLACE_IDX,
  mine,
  visible,
  nearMines
});

export default place;
