export default function getAccountNumber() {
  let accountNumber = "";
  for (let i = 0; i < 14; i++) {
    let randomDigit = Math.floor(Math.random() * 10);
    accountNumber += randomDigit;
  }
  return accountNumber;
}
