import { Query } from "mongoose";
import { TQueryObj } from "../types/TQueryObj";
import { select } from "./fieldSelectHelper";
import { filter } from "./filterHelper";
import { paginate } from "./paginateHelper";
import { search } from "./searchHelper";
import { sort } from "./sortHelper";

export const getQuery = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
  // exact match - filter
  const filteredQuery = filter(modelQuery, query);
  // partial match - searching
  const searchedQuery = search(filteredQuery, query);
  // sort
  const sortedQuery = sort(searchedQuery, query);
  // paginate
  const paginatedQuery = paginate(sortedQuery, query);
  // fields
  const selectedFieldQuery = select(paginatedQuery, query);

  return selectedFieldQuery;
};
