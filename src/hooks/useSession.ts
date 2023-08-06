import { useAppSelector } from './rtk';

export const useSession = () => {
  const session = useAppSelector(
    (state) => state.auth.userInfo
  );
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const sessionData = getLocalItem<iSignInRes>('sessionData');

  //   if (sessionData) {
  //     dispatch(setUserInfo({
  //       userInfo: sessionData,
  //     }));
  //   }
  // }, []);

  return session;
};
