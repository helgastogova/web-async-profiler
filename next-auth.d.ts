declare module 'next-auth' {
  interface JWT {
    token: { accessToken: string };
    account: { access_token: string };
  }

  interface Session {
    token: { accessToken: string };
    session: { accessToken: string };
  }

  interface SignInEvent {
    user: { email: string; name: string; image: string; id: string };
  }
}
