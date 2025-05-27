
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, Client } from '../services/apiService';

export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: () => apiService.getAllClients(),
  });
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (client: Omit<Client, 'id'>) => apiService.createClient(client),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, client }: { id: number; client: Omit<Client, 'id'> }) => 
      apiService.updateClient(id, client),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiService.deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
};
