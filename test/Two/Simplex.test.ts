import Point2D, { createPoint2D } from "../../src/simplex/Two/Point2D";
import {
  calculateTrialPoints,
  sortPointsByMin,
  step,
} from "../../src/simplex/Two/Simplex";
describe("simplex", () => {
  const p1 = createPoint2D(2, 6);
  const p2 = createPoint2D(8, 6);
  const p3 = createPoint2D(8, 12);
  const fn = ({ x, y }: Point2D) => x * x + y * y;

  const [g, b, w] = sortPointsByMin(fn)([p1, p2, p3]);
  test("sort by minimum", () => {
    expect(g.x).toBe(2);
    expect(g.y).toBe(6);
    expect(b.x).toBe(8);
    expect(b.y).toBe(6);
    expect(w.x).toBe(8);
    expect(w.y).toBe(12);
  });
  describe("trial points", () => {
    test("first trial point", () => {
      const t = calculateTrialPoints(fn)([g, b, w])(1);
      expect(t.x).toBe(6.5);
      expect(t.y).toBe(9);
    });
    test("second trial point", () => {
      const t = calculateTrialPoints(fn)([g, b, w])(2);
      expect(t.x).toBe(2);
      expect(t.y).toBe(0);
    });
    test("third trial point", () => {
      const t = calculateTrialPoints(fn)([g, b, w])(3);
      expect(t.x).toBe(-1);
      expect(t.y).toBe(-6);
    });
  });
  test("full step", () => {
    const result = step(fn)([p1, p2, p3]);
    expect(result[0].x).toBe(2);
    expect(result[0].y).toBe(0);
    expect(result[1].x).toBe(2);
    expect(result[1].y).toBe(6);
    expect(result[2].x).toBe(8);
    expect(result[2].y).toBe(6);
  });
});
