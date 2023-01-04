//Must import Account class before using it
import Account from "./Account.js";
//import XLSX from "./package-lock.json";

// const XLSX = require(['xlsx']); 

//import XLSX from 'xlsx';
//Local excel file:

const filePath = './Logins.xlsx';

//MAIN ISSUE: FILE MUST BE CONVERTED FIRST AS FOLLOWS:
//1. Specify .xlsx file like above
//2. convert file into spreadsheet bytes (work on this)
//3. specify spreadsheet bytes data in XLSX.read(data, opts);

//file parameter MUST be a passed File or Blob object
async function readFileAsBinaryString(file) { /* use in an async function to await on the result */
            
      const binaryString = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject('error : cannot read the file');
                reader.readAsBinaryString(file);
      });
        
      //console.log(binaryString);
      return binaryString;
}

//const data = await (await fetch(url)).arrayBuffer();
//var workbook = xlsx.readFile(filePath);

// XLSX is a global from the standalone script

const workbook = XLSX.read(filePath, { type: 'binary' });
var worksheet = workbook.Sheets[workbook.SheetNames[0]];
var worksheetName = workbook.SheetNames[0];
var range = XLSX.utils.decode_range(worksheet['!ref']);
var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[worksheetName]);
var txt = XLSX.utils.sheet_to_txt(worksheet);

//const accounts = [];
console.log("I am running");
console.log(excelRows);
console.log(worksheet);
console.log(workbook);
console.log(range);
const submitButton = document.querySelector('input[name="Submit"]');

//Make for loop and fill accounts array with accounts excel data:
//This system will not work as local Excel files cannot be accessed in client-side
//Only File objects or Blob objects can be accessed by Browser; those are inputs and public for viewing (not secure)
/*
function checkExcelLogin(inpUserName, inpPassword) {
    let index = 1; //Excel sheets start at index/row 1
    let found = false;

    //Loop until a blank cell is encountered = end of possible logins
    while (worksheet[`A-${index}`] != "")
    {   
        //For testing:
        console.log(worksheet[`A-${index}`]);

        if ((worksheet[`A-${index}`] === inpUserName) && (worksheet[`B-${index}`] === inpPassword)) {
            found = true;
            return found;
        }
        index += 1;
    }

    return found;
    
    
}
*/

//Each element in accountsArray shall be an Account object with initialized properties
//This system is to be used when a database is connected (not Excel file)
function checkLogin(inpUserName, inpPassword, accountsArray) {
    //0 = invalid, 1 = valid (user), 2 = admin --> set logins
    let accountType = 0;

    if ((inpUserName === 'admin') && (inpPassword === 'override')) {
        accountType = 2;
    }
    else {
        for (let index = 0; index < accountsArray.length; index++) {
            if ((inpUserName === accountsArray[i].getUserName()) && (inpPassword === accountsArray[i].getPassword())) {
            accountType = 1;
            }
        }
    }  

    return accountType;
}

//Temporary and weak login system
var usingHardCodeLogins = true; //modify this as you choose DB or hardcode (DB = Node.js + SQL)

function checkHardCodeLogin(inpUsername, inpPassword) {
    let tempUserNames = ['Bee_St1ng', 'chill141', 'SMonty', 'Thanzoid', 'GoblinWarBuggy', 'Tadgear'];
    let tempPasswords = ['admin'];

    let validUserName = false;
    let validPassword = false;

    for (let i = 0; i < tempUserNames.length; i++) {
        if (inpUsername === tempUserNames[i]) {
            validUserName = true;
            if ((i < tempPasswords.length) && (inpPassword === tempPasswords[i])) {
                validPassword = true;
            }
            break;
        }
    }

    if (validUserName && validPassword) {
        return true;
    }
    else {
        return false;
    }
}

submitButton.addEventListener("click", (event) => { 
    //Tested "current" variables; they work
    console.log(event);
    let currentUserName = document.querySelector('input[name="User Name"]').value;
    let currentPassword = document.querySelector('input[name="Password"]').value;

    //For testing:
    console.log(currentUserName);
    console.log(currentPassword);

    let validLogin = checkHardCodeLogin(currentUserName, currentPassword);

    //For testing:
    console.log(validLogin);

    if (validLogin == 1) {
        location.assign("validUserHome.html");
    }
    else if (validLogin == 2){
        location.assign("validUserHome.html")
    }
});

if (usingHardCodeLogins) {
    //Prevent right-clicks on web page for inspection
    document.addEventListener('contextmenu', function (e) { 
        e.preventDefault(); 
      }, false);

    document.addEventListener("keydown", (e) => {
        // USE THIS TO DISABLE CONTROL AND ALL FUNCTION KEYS
        // if (e.ctrlKey || (e.keyCode>=112 && e.keyCode<=123)) {
        // THIS WILL ONLY DISABLE CONTROL AND F12
        if (e.ctrlKey || e.key === "F12") {
          e.stopPropagation();
          e.preventDefault();
        }
    });
}
