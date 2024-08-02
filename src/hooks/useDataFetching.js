import { useQuery } from "@tanstack/react-query";
import api from "../configs/api";

const useDataFetching = ({ queryKey, endPoint, params = {} }) => {
    return useQuery({
        queryKey: [queryKey, params],
        queryFn: () => {
            const { id, ...otherParams } = params;

            if (!id) {
                return api
                    .get(`${endPoint}`, otherParams)
                    .then((res) => res.data);
            } else {
                return api.get(`${endPoint}/${id}`).then((res) => res.data);
            }
        },
    });
};

export default useDataFetching;
