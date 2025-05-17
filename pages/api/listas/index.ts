import { NextApiRequest, NextApiResponse } from "next";

function getLista() {
  const arr = Array.from(Array(10).keys());
  return arr.map((valor, indice) => {
    return { nombre: valor };
  });
}

export default function (req: NextApiRequest, res: NextApiResponse) {
  const lista = getLista();
  res.send({
    lista,
  });
}
