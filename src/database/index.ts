import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    console.log("Sucesso em conectar com a base de dados 💚");
  })
  .catch((error) => {
    console.log("Error em conectar com a base de dados ❌", error);
  });

export default prisma;
