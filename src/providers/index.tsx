import { ReactNode } from 'react';
import QueryProvider from './QueryProvider';

interface ProvidersProps {
	children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
	return (
		//<ZustandProvider>
		<QueryProvider>{children}</QueryProvider>
		//</ZustandProvider>
	);
}
