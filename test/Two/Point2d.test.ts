import {
  add,
  createPoint2D,
  scale,
  subtract,
} from "../../src/simplex/Two/Point2D";

describe("point2D", () => {
  test("can create a point", () => {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 500 - 250;
    const point = createPoint2D(x, y);
    expect(point.x).toBe(x);
    expect(point.y).toBe(y);
  });
  test("can add two points", () => {
    const a = Math.random() * 200 - 100;
    const b = Math.random() * 500 - 250;
    const c = Math.random() * 200 - 100;
    const d = Math.random() * 500 - 250;
    const point1 = createPoint2D(a, b);
    const point2 = createPoint2D(c, d);
    const result = add(point1, point2);
    expect(result.x).toBe(a + c);
    expect(result.y).toBe(b + d);
  });
  test("can subtract two points", () => {
    const a = Math.random() * 200 - 100;
    const b = Math.random() * 500 - 250;
    const c = Math.random() * 200 - 100;
    const d = Math.random() * 500 - 250;
    const point1 = createPoint2D(a, b);
    const point2 = createPoint2D(c, d);
    const result = subtract(point1, point2);
    expect(result.x).toBe(a - c);
    expect(result.y).toBe(b - d);
  });
  test("can scale up a point", () => {
    const a = Math.random() * 200 - 100;
    const b = Math.random() * 500 - 250;
    const c = Math.random() * 200 - 100;
    const point1 = createPoint2D(a, b);
    const result = scale(c, point1);
    expect(result.x).toBe(c * a);
    expect(result.y).toBe(c * b);
  });
});
