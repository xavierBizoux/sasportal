import { CookieAuthenticationCredential } from "@sassoftware/sas-auth-browser"
import { vaInfo } from "../constants"

const instance = new CookieAuthenticationCredential({
  url: vaInfo.url,
})

export { instance }
