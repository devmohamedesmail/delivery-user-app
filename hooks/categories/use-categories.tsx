import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { config } from '@/constants/config';



export const useCategories = () => {
    
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["categories"],
        queryFn: () => axios.get(`${config.URL}/categories`).then((res) => res.data.data),
    })

    return { data, isLoading, error, refetch }
}
