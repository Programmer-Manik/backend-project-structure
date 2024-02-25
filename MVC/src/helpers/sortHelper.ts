import { Query } from "mongoose";
import { TQueryObj } from "../types/TQueryObj";

export const sort = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
  if (query.sortBy && query.sortOrder) {
    const sortBy = query.sortBy;
    const sortOrder = query.sortOrder;
    const sortString = `${sortOrder === "desc" ? "-" : ""}${sortBy}`;

    modelQuery.sort(sortString);
  }
  return modelQuery;
};
