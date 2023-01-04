class Account {
    //Account class constructor:
    constructor (
        userName,
        password,
        rollNum,
        fullName
    ) {
        //"This soon-to-be object's userName stores the passed-in userName"
        this.userName = userName;
        this.password = password;
        this.rollNum = rollNum;
        this.fullName = fullName;
    }

    //Account class methods:
    getUserName() {
        return this.userName;
    }

    getPassword() {
        return this.password;
    }

    getRollNum() {
        return this.rollNum;
    }

    getFullName() {
        return this.fullName;
    }

    resetPassword(newPassword) {
        this.password = newPassword;
    }
}

export default Account;