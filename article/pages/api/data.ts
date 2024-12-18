import type { NextApiRequest, NextApiResponse } from "next";

export default async function test(req: NextApiRequest, res: NextApiResponse) {
  {
    try {
      const response = await fetch("https://perl.is/random");
      const data =  await response.json()

      res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
  }
}
