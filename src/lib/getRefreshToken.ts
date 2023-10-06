export default async function getRefreshTokenF(refreshToken: string) {
  try {
    const result = await fetch(
      "https://dev-userhub.aecmultiverse.com/session",
      {
        method: "POST",
        body: JSON.stringify({
          eventType: "REFRESH_TOKEN",
          previousRefreshToken: refreshToken,
        }),
      }
    ).then((res) => res.json());
    if (result && result.code == "REFRESH_TOKEN_REQUEST_SUCCESSFUL") {
      return { ...result.body, RefreshToken: refreshToken };
    } else {
      return null;
    }
  } catch (error: any) {
    console.error(error);
    const signout = await fetch("/api/auth/signOut").then((res) => res.json());
    return null;
  }
}
