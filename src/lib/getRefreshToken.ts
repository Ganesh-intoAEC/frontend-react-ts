export default async function getRefreshToken(refreshToken: string) {
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
      const signout = await fetch(
        "/api/auth/signout?callbackUrl=/auth/signIn",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            await fetch("/api/auth/csrf").then((rs) => rs.json())
          ),
        }
      ).then((res) => res.json());
      return null;
    }
  } catch (error: any) {
    console.error(error);

    const signout = await fetch("/api/auth/signout?callbackUrl=/auth/signIn", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        await fetch("/api/auth/csrf").then((rs) => rs.json())
      ),
    }).then((res) => res.json());
    return null;
  }
}
