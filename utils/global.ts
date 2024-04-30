export const authProvider = [
  {
    id: "google",
    icon: "/icons/google.png",
    text: "Login With Google",
  },
  {
    id: "twitter",
    icon: "/icons/twitter.jpeg",
    text: "Login With Twitter",
  },
  {
    id: "git-hub",
    icon: "/icons/git.png",
    text: "Login With GitHub",
  },
  {
    id: "facebook",
    icon: "/icons/fb.webp",
    text: "Login With Facebook",
  },
];

// This is added for testing on local
export const SESSION_TIME_OUT_DURATION = parseInt(process.env.NEXT_PUBLIC_SESSION_TIMEOUT + "") || 60;
export const IDLE_TIME_OUT_DURATION = parseInt(process.env.NEXT_PUBLIC_IDLE_TIMEOUT + "") || 30;
export const REFRESH_TOKEN_DURATION = parseInt(process.env.NEXT_PUBLIC_REFRESH_TOKEN_DURATION + "") || 5;