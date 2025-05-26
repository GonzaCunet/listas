import { NextApiRequest, NextApiResponse } from "next";
import { getOffsetAndLimitFromReq } from "lib/requests";
import { Airtablebase } from "lib/airtable";

export default function (req: NextApiRequest, res: NextApiResponse) {
  const { offset, limit } = getOffsetAndLimitFromReq(req, 100, 100000);
  Airtablebase("Furniture")
    .select({
      pageSize: limit,
    })
    .firstPage(function (err, records) {
      if (err) {
        console.log(err);
        return;
      }
      const results = records.map((r) => {
        return { ...r.fields, id: r.id };
      });
      res.send({
        results,
        pagination: {
          offset,
          limit,
          // total: lista.length,
        },
      });
    });
}
