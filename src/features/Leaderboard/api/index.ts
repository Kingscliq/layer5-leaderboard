import { useQuery } from '@tanstack/react-query';
import { axios } from 'lib';
import { toast } from 'react-toastify';

export const useDashboardMetrics = () => {
  const fetchDashboardMetrics = async () => {
    try {
      const response = await axios.get(`/admin-dashboard`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { data: dashboardMetrics, isFetching: loadingDashboardMetrics } =
    useQuery({
      queryKey: ['dashboardMetrices'],
      queryFn: fetchDashboardMetrics,
      onError: (err) =>
        toast.error(
          typeof err === 'string'
            ? err
            : 'Something went wrong fetching status list'
        ),
    });

  return [{ dashboardMetrics, loadingDashboardMetrics }];
};
