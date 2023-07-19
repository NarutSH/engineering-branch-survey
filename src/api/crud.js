import serviceApi from "./serviceApi";

export const getAllVotes = async () => {
  const url = "/votes";
  const response = await serviceApi.get(url);

  return response.data;
};

export const postVote = async (data) => {
  const url = "/votes";

  const response = await serviceApi.post(url, data);

  return response.data;
};
