export const STATUSES = ["wishlist", "applied", "interview", "offer", "rejected"] as const;
export type Status = (typeof STATUSES)[number];

export const isStatus = (value: unknown): value is Status =>
  (STATUSES as readonly unknown[]).includes(value);
