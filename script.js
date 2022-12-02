//Must import Account class before using it
import Account from "./Account.js";

const xslx = require('xlsx');
//Local excel file:
const filePath = './Logins.xlsx';
var workbook = xlsx.readFile(filePath);
var worksheet = workbook.Sheets[workbook.SheetNames[0]];

const accounts = [];

//Make for loop and fill accounts array with accounts excel data: