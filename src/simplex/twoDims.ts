interface Point2D {
  x: number;
  y: number;
}

const createPoint2D = (x: number, y: number): Point2D => ({ x, y });
const add = (a: Point2D, b: Point2D): Point2D => ({
  x: a.x + b.x,
  y: a.y + b.y,
});
const subtract = (a: Point2D, b: Point2D): Point2D => add(a, scale(-1, b));
const scale = (m: number, { x, y }: Point2D): Point2D => ({
  x: m * x,
  y: m * y,
});

type ObjectiveFunction = (x: Point2D) => number;

type Simplex = [Point2D, Point2D, Point2D];

const simplex2D = (f: ObjectiveFunction) => {
  const sortFn = (a: Point2D, b: Point2D) => f(a) - f(b);
  return (s: Simplex): Simplex => {
    const cp = [...s];
    cp.sort(sortFn);
    const [g, b, w] = cp;
    const t1 = scale(0.25, add(add(scale(2, w), g), b));
    const t2 = add(g, subtract(b, w));
    const t3 = scale(0.5, add(scale(3, add(g, b)), scale(-4, w)));
    const next = [t1, t2, t3].sort(sortFn);
    return [next[0], b, g];
  };
};
