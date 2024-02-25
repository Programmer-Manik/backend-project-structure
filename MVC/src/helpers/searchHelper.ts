import { FilterQuery, Query } from "mongoose";
import { TQueryObj } from "../types/TQueryObj";

export const search = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
  if (query.searchTerm) {
    const fieldValues = Object.values(modelQuery.model.schema.paths);

    const searchableFields = fieldValues
      .filter((fieldObj) => {
        if (fieldObj.instance === "String") {
          return true;
        }
      })
      .map(
        (fieldObj) => ({ [fieldObj.path]: { $regex: query.searchTerm, $options: "i" } } as FilterQuery<T>)
      );

    modelQuery.find({ $or: searchableFields });
  }
  return modelQuery;
};
