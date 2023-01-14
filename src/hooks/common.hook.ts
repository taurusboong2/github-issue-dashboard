import { useNavigate } from 'react-router-dom';

export const useRedirectHome = () => {
  const navigate = useNavigate();

  const redirectHome = (delay = 0) => {
    setTimeout(() => {
      navigate('/');
    }, delay);
  };

  return redirectHome;
};
