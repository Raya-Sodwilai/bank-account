// Business Logic for BankAccount ---------
function BankAccount() {
  this.accounts = {};
  this.currentId = 0;
}

BankAccount.prototype.addAccount = function(account) {
  account.id = this.assignId();
  this.accounts[account.id] = account;
}

BankAccount.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

BankAccount.prototype.findAccount = function(id) {
  if (this.accounts[id] != undefined) {
    return this.accounts[id];
  }
  return false;
}

BankAccount.prototype.deleteContact = function(id) {
  if (this.accounts[id] === undefined) {
    return false;
  }
  delete this.accounts[id];
  return true;
}

// Business Logic for Accounts ---------
function Account(firstLastName, initialDeposit) {
  this.firstLastName = firstLastName;
  this.initialDeposit = initialDeposit;
  
}

Account.prototype.fullName = function() {
  return this.firstLastName + " " + this.initialDeposit;
}

function Account(depositAmount, withdrawalAmount) {
  this.depositAmount = depositAmount;
  this.withdrawalAmount = withdrawalAmount;
  
}

Account.prototype.remainBalance = function() {
  return this.depositAmount + " " + this.withdrawalAmount;
}


// User Interface Logic ---------
let bankAccount = new BankAccount();

function displayAccountDetails(bankAccountToDisplay) {
  let accountsList = $("ul#accounts");
  let htmlForAccountInfo = "";
  Object.keys(bankAccountToDisplay.accounts).forEach(function(key) {
    const account = bankAccountToDisplay.findAccount(key);
    htmlForAccountInfo += "<li id=" + account.id + ">" + contact.firstLastName + " " + contact.initialDeposit + "</li>";
  });
  accountsList.html(htmlForAccountInfo);
};

function showAccount(accountId) {
  const account = bankAccount.findAccount(accountId);
  $("#show-account").show();
  $(".first-last-name").html(contact.firstLastName);
  $(".initial-deposite").html(account.initialDeposit);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + account.id + ">Delete</button>");
}

function attachAccountListeners() {
  $("ul#accounts").on("click", "li", function() {
    showAccount(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    bankAccount.deleteAccount(this.id);
    $("#show-account").hide();
    displayAccountDetails(bankAccount);
  });
};

$(document).ready(function() {
  attachAccountListeners();
  $("form#new-account").submit(function(event) {
    event.preventDefault();
    var inputtedFirstLastName = $("input#new-first-last-name").val();
    var inputtedInitialDeposit = $("input#new-initial-deposit").val();
    $("input#new-first-last-name").val("");
    $("input#new-initial-deposit").val("");
    var newAccount = new Account(inputtedFirstLastName, inputtedInitialDeposit);
    bankAccount.addAccount(newAccount);
    displayAccountDetails(bankAccount);
  });
});