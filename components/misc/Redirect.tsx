import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingIndicator from '../suspenseOrganisms/LoadingIndicator';

type RedirectProps = {
  to?: string;
  loadingText?: string;
};

function Redirect({ to = '/', loadingText = 'در حال هدایت' }: RedirectProps) {
  const { replace } = useRouter();

  useEffect(() => {
    replace(to);
  }, [replace, to]);

  return <LoadingIndicator text={loadingText} />;
}

export default Redirect;
