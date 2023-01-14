const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");
// create/validate folder
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}
// create/validate file json
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}
const loadContact = () => {
  const file = fs.readFileSync("data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};
// save new contacts
const saveContacts = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  // const file = fs.readFileSync("data/contacts.json", "utf-8");
  // const contacts = JSON.parse(file);
  const contacts = loadContact();

  // check duplicat
  const duplicatName = contacts.find((contact) => contact.nama === nama);
  const duplicatEmail = contacts.find((contact) => contact.email === email);

  if (duplicatName) {
    console.log(chalk.red.inverse.bold("Kontak sudah terdaftar!"));
    return false;
  }
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold("Email tidak valid!"));
      return false;
    } else if (duplicatEmail) {
      console.log(chalk.red.inverse.bold("Email sudah terdaftar!"));
      return false;
    }
  }

  if (!validator.isMobilePhone(noHp, "id-ID")) {
    console.log(
      chalk.red.inverse.bold("Nomor tidak valid "),
      chalk.yellow.inverse.bold("Indonesia phone number only!")
    );
    return false;
  }
  contacts.push(contact);

  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));
  console.log(chalk.green.inverse.bold("Kontak berhasil disimpan!"));
};

const listContacts = () => {
  const contacts = loadContact();
  console.log(chalk.green.inverse.bold("Daftar kontak: "));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`);
  });
};
const detailContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  if (!contact) {
    console.log(chalk.yellow.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }
  console.log(chalk.cyan.inverse.bold(contact.nama));
  console.log(contact.noHp);
  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.yellow.inverse.bold(`${nama} tidak ditemukan!`));
    return false;
  }
  fs.writeFileSync("data/contacts.json", JSON.stringify(newContacts));
  console.log(chalk.green.inverse.bold("Kontak berhasil dihapus!"));
};
module.exports = {
  saveContacts,
  listContacts,
  detailContact,
  deleteContact,
};
