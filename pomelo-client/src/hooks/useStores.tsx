// import { dummyStores } from "@/dummy/stores";
import { addStore, fetchAllStores, Store, StoreCreate } from "../lib/stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useStores = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["stores"],
    queryFn: fetchAllStores,
  });

  const addStoreMutation = useMutation({
    mutationFn: addStore,
    onMutate: async (newStore: StoreCreate) => {
      await queryClient.cancelQueries({ queryKey: ["stores"] });

      const previousStores = queryClient.getQueryData<Store[]>(["stores"]);

      queryClient.setQueryData<Store[]>(["stores"], (oldStores) => {
        const tempId =
          Math.max(...(oldStores?.map((store) => store.id) || [0])) + 1;
        const newStoreWithId = { ...newStore, id: tempId } as Store;
        return oldStores ? [...oldStores, newStoreWithId] : [newStoreWithId];
      });

      return { previousStores };
    },

    onError: (_err, _newStore, context) => {
      queryClient.setQueryData<Store[]>(["stores"], context?.previousStores);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });

  return {
    stores: data || [],
    isLoading,
    addStore: addStoreMutation.mutate,
    isAdding: addStoreMutation.isPending,
  };
};
