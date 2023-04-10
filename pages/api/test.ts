import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  console.log("Response phonepe pratham =>", {
    query: req.query,
    body: req.body,
    DecodedBody: atob(req.body),
  });
  return res.send(`OK`);
}
