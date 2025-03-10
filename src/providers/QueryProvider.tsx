import { QueryClient, QueryClientProvider } from 'react-query';

import React from 'react';

interface QueryProviderProps {
	children: React.ReactNode;
}

const queryClient = new QueryClient();

const QueryProvider = ({ children }: QueryProviderProps) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default QueryProvider;
