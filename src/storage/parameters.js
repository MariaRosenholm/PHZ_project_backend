"use strict";
export const toArrayInsert = (nps) => [
  +nps.id,
  nps.date,
  +nps.score,
  nps.feedback,
];
