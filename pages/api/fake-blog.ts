// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import data from "./blogs.json";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("X-Dns-Prefetch-Control", "off");
  // res.setHeader(
  //   "Strict-Transport-Security",
  //   "max-age=15552000; includeSubDomains"
  // );
  // res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Encoding", "gzip");
  res.setHeader("Transfer-Encoding", "chunked");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data.data as any);
}
