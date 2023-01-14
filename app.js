const { argv } = require("yargs");
const yargs = require("yargs");
const contacts = require("./contacts");
yargs
  .command({
    command: "add",
    describe: ": Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama Lengkap",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
      telepon: {
        describe: "No Handphone",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contacts.saveContacts(argv.nama, argv.email, argv.telepon);
    },
  })
  .demandCommand();
// menampilkan list kontak
yargs.command({
  command: "list",
  describe: ": Menampilkan list kontak",
  handler() {
    contacts.listContacts();
  },
});
// show details contact
yargs.command({
  command: "detail",
  describe: ": Menampilkan detail kontak berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.detailContact(argv.nama);
  },
});
// menghapus contact berdasarkan nama
yargs.command({
  command: "delete",
  describe: ": Menghapus kontak berdasarkan nama",
  builder: {
    nama: {
      describe: "Nama Lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.nama);
  },
});
yargs.parse();
