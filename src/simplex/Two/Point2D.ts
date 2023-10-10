export default interface Point2D {
  readonly x: number;
  readonly y: number;
}
export const createPoint2D = (x: number, y: number): Point2D => ({ x, y });
export const add = (a: Point2D, b: Point2D): Point2D => ({
  x: a.x + b.x,
  y: a.y + b.y,
});
export const scale = (m: number, { x, y }: Point2D): Point2D => ({
  x: m * x,
  y: m * y,
});
export const subtract = (a: Point2D, b: Point2D): Point2D =>
  add(a, scale(-1, b));
