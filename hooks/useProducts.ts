import { IProduct } from 'interfaces';
import useSwr from 'swr';
import { SWRConfiguration } from 'swr/_internal';

const fetcher = (...args: [ key: string ]) => fetch(...args).then(res => res.json());


export const useProducts = ( url: string, config: SWRConfiguration = {} ) => {
    // const { data, error } = useSwr<IProduct[]>(`/api${url}`, fetcher, config );
    const { data, error } = useSwr<IProduct[]>(`/api${url}`, fetcher, config );

    return {
        products: data || [],
        isLoading: !error && !data,
        isError: error
    }

}