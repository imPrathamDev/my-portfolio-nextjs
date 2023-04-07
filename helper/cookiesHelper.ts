export function setCookie(cname: string, cvalue: number, exdays: number): void {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  if (typeof document !== "undefined") {
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
}

export function deleteCookie(cname: string): void {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  if (typeof document !== "undefined") {
    document.cookie = cname + "=;" + expires + ";path=/";
  }
}

export function getCookie(cname: string): string | null {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}
