import type { ListMeta } from "@md/types";
import { gql } from "@apollo/client";

const useUpdateMutation = <TData, TVariables>(
  list: ListMeta,
  selectedFields: string,
  useMutation: (
    mutation: ReturnType<typeof gql>,
    options?: any
  ) => any
) => {
  const [
    updateFunction,
    { loading, error: errorMutation, data: dataMutation },
  ] = useMutation(
    gql`mutation UpdateItem($data: ${list.gqlNames.updateInputName}!, $id: ID!) {
      item: ${list.gqlNames.updateMutationName}(where: { id: $id }, data: $data) {
        ${selectedFields}
      }
    }`,
    { errorPolicy: "all" }
  );

  // Returning the states and mutation function
  return {
    update: updateFunction,
    error: errorMutation,
    loading,
    data: dataMutation,
  };
};

export { useUpdateMutation };
