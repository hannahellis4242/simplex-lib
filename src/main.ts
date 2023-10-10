import Point2D, { createPoint2D } from "./simplex/Two/Point2D";
import { showSimplex, step } from "./simplex/Two/Simplex";

const fn = ({ x, y }: Point2D) => x * x + y * y;
const stepFn = step(fn);
const result = new Array(100).fill(0).reduce(
  (last, _) => {
    const next = stepFn(last);
    console.log(showSimplex(last));
    return next;
  },
  [createPoint2D(20, 60), createPoint2D(80, 120), createPoint2D(80, 60)]
);
console.log(showSimplex(result));
