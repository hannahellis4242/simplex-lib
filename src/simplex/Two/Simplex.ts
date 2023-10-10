import ObjectiveFunction from "./ObjectiveFunction";
import Point2D, { scale, add, subtract } from "./Point2D";

type Simplex = [Point2D, Point2D, Point2D];
export default Simplex;

export const sortPointsByMin = (f: ObjectiveFunction) => {
  const sortFn = (a: Point2D, b: Point2D) => f(a) - f(b);
  return (points: Point2D[]) => {
    const cp = [...points];
    cp.sort(sortFn);
    return cp;
  };
};

type trialPointIndex = 1 | 2 | 3;
export const calculateTrialPoints =
  (f: ObjectiveFunction) =>
  ([g, b, w]: Simplex) =>
  (i: trialPointIndex) => {
    switch (i) {
      case 1:
        return scale(0.25, add(add(scale(2, w), g), b));
      case 2:
        return add(g, subtract(b, w));
      case 3:
        return scale(0.5, add(scale(3, add(g, b)), scale(-4, w)));
    }
  };

export const step = (f: ObjectiveFunction) => {
  const sortFn = sortPointsByMin(f);
  const trialPointFn = calculateTrialPoints(f);
  return (s: Simplex): Simplex => {
    const sorted = sortFn(s) as Simplex;
    const trialPointSimplexFn = trialPointFn(sorted);
    const trialPoints = new Array(3)
      .fill(1)
      .map((_, i) => i + 1)
      .map((i) => i as trialPointIndex)
      .map((i) => trialPointSimplexFn(i));
    const next = sortFn(trialPoints);
    return [next[0], sorted[0], sorted[1]];
  };
};

export const showSimplex = (s: Simplex): string =>
  `${s[0].x}\t${s[0].y}\t${s[1].x}\t${s[1].y}\t${s[2].x}\t${s[2].y}\t`;
