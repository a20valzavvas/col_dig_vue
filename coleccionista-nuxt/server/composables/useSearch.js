import { useApi } from "./useApi";

export const useSearch = () => {
  const api = useApi();

  const query = ref("");
  const results = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const search = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await api.get("/anime", {
        params: {
          q: query.value,
          order_by: "score",
          sort: "desc",
          limit: 25,
        },
      });
      results.value = response.data.data;
    } catch (e) {
      error.value = "Error carregant dades.";
    }

    loading.value = false;
  };

  return { query, results, loading, error, search };
};
