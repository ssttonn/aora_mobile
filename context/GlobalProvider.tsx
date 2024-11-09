import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useState, useEffect } from "react";

interface GlobalState {
  user: IUser | undefined;
  isLoading: boolean;
}

const initialState: GlobalState = {
  user: undefined,
  isLoading: true,
};

const GlobalContext = createContext<GlobalState>(initialState);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    setIsFetching(true);
    getCurrentUser()
      .then(
        (currentUser) => {
          if (!currentUser) {
            throw new Error("No user found");
          }
          setUser({
            email: currentUser.email,
            username: currentUser.username,
            avatar: currentUser.avatar,
            accountId: currentUser.accountId,
          });
        },
        (_) => {
          setUser(undefined);
        }
      )
      .finally(() => {
        setIsFetching(false);
      });
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        user,
        isLoading: isFetching,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
