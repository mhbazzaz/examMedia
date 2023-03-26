const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const user = [
  {
    fname: "Mohammad",
    lname: "Bazzaz",
    phone: "09126098073",
    password: "abc123",
  },
];

const ticket = [
  {
    from_locaion: "tehran",
    to_location: "kish",
    departure_date: new Date().setDate(new Date().getDate() + 1),
    unit_price: 200.2,
    count: 1,
  },
];

async function main() {
  for (let elm of user) {
    await prisma.User.create({
      data: elm,
    });
  }
  for (let elm of ticket) {
    await prisma.Ticket.create({
      data: elm,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
