const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = {
  create: async (req, res) => {
    try {
      await prisma.teste.create({
        data: {
          foodTypeId: req.body.foodTypeId,
          name: req.body.name,
          remark: req.body.remark,
          status: "use",
        },
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.messge });
    }
  },
  list: async (req, res) => {
    try {
      const rows = await prisma.teste.findMany({
        include: {
            FoodType : true,
        },
        where: {
          status: "use",
        },
        orderBy: {
          id: "desc",
        },
      });
      return res.send({ results: rows });
    } catch (e) {
      return res.status(500).send({ error: e.messge });
    }
  },
  remove : async (req,res)=> {
    try {
        await prisma.teste.update({
            data: {
                status: 'delete'
            },
            where: {
                id : parseInt(req.params.id)
            }
        })

        return res.send({ message: "success" });
      } catch (e) {
        return res.status(500).send({ error: e.messge });
      }
  },
  update: async (req, res) => {
    try {
      await prisma.teste.update({
        data: {
          name: req.body.name,
          remark: req.body.remark,
          foodTypeId: req.body.foodTypeId,
        },
        where: {
          id: req.body.id,
        },
      });
      return res.send({ message: "success" });
    } catch (e) {
      return res.status(500).send({ error: e.messge });
    }
  },
};