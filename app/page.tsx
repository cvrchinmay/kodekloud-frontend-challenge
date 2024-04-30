'use client'
import HomeLayout from "@/layouts/HomeLayout";
import { auth, refreshToken } from "@/lib/firebase";
import { useAuthContext } from "@/provider/AuthProvider";
import { IDLE_TIME_OUT_DURATION, REFRESH_TOKEN_DURATION, SESSION_TIME_OUT_DURATION } from "@/utils/global";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { userData:{name, email, isLoggedIn} } = useAuthContext();

  // This useEffect is written to handle refresh token mechanism
 
  useEffect(() => {
    const refreshTokenInterval = setInterval(() => {
      refreshToken(); 
    },REFRESH_TOKEN_DURATION * 60 * 1000);

    return () => clearInterval(refreshTokenInterval);
  }, []);

  // This useEffect is written to handle idle logout mechanism
  useEffect(() => {
    if(isLoggedIn) {
      let idleLogoutTimer: any;

      // Start timer for idle logout
      const startLogoutTimer = () => {
        idleLogoutTimer = setTimeout(() => {
          auth.signOut(); 
          router.push('/login'); 
        }, IDLE_TIME_OUT_DURATION * 60 * 1000);
      };

      const resetTimer = () => {
        clearTimeout(idleLogoutTimer);
        startLogoutTimer();
      };

      const handleUserActivity = () => {
        document.addEventListener('mousemove', resetTimer);
        document.addEventListener('keypress', resetTimer);
      };

      const handleAuthStateChange = () => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            handleUserActivity();
            startLogoutTimer();
          } else {
            clearTimeout(idleLogoutTimer);
          }
        });
      };

      handleAuthStateChange();

      return () => {
        document.removeEventListener('mousemove', resetTimer);
        document.removeEventListener('keypress', resetTimer);
        clearTimeout(idleLogoutTimer);
      };
    }
  }, [isLoggedIn, router]);

  // This useEffect is written to session logout mechanism
  useEffect(() => {
    if(isLoggedIn) {
      
      let sessionTimer: any;
      const handleAuthStateChange = () => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            startSessionTimer(user);
          } else {
            clearTimeout(sessionTimer);
          }
        });
      };

      const startSessionTimer = (user: any) => {
        const sessionTimeout = SESSION_TIME_OUT_DURATION * 60 * 1000;
        const loginTime = new Date(user.metadata.lastSignInTime).getTime();
        const expirationTime = loginTime + sessionTimeout;
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;

        if (timeUntilExpiration > 0) {
          sessionTimer = setTimeout(() => {
            auth.signOut();
            router.push('/login');
          }, timeUntilExpiration);
        } else {
          auth.signOut();
          router.push('/login');
        }
      };

      handleAuthStateChange();
      return () => clearTimeout(sessionTimer);
    
    }
  }, [isLoggedIn, router]);


  return (
    <HomeLayout>
      <h1 className="pt-8 text-xl">Home Page</h1>
      <h1 className="pt-8 text-normal">Name: {name}</h1>
      <h1 className="pt-8 text-normal">Email: {email}</h1>
    </HomeLayout>
  );
}
