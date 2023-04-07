import axios from "axios";

export default function getReadmeMD(url: string): any {
  return axios.get(url);
}
