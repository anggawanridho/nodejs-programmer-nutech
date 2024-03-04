import { getBanner } from "../../repositories/banner.js";

export default async (request) => {
  try {
    const limit = parseInt(request.query.limit) || 10;
    const offset = parseInt(request.query.offset) || 0;

    const data = await getBanner(limit, offset);
    return {
      offset: offset,
      limit: limit,
      records: data,
    };
  } catch (err) {
    throw new Error("Error while fetching banner data");
  }
};
