// Business Logic for Accounts ---------
function Account() {
  this.firstLastName = '';
  this.initialDeposit = 0;
}

Account.prototype.addName = function(name) {
  return this.firstLastName = name;
}

Account.prototype.deposit = function(depositAmount) {
  return this.initialDeposit += depositAmount;
}

Account.prototype.withdraw = function(withdrawalAmount) {
  return this.initialDeposit -= withdrawalAmount;
}

// User Interface Logic ---------
function displayAccountBalance(accountInfo) {
  let account = $("#show-account");
  let htmlForAccountInfo = "";

  htmlForAccountInfo += "<p>" + accountInfo.firstLastName + "</p>" + "<p>" + "$" + accountInfo.initialDeposit + "<p>";
  account.html(htmlForAccountInfo);
};

$(document).ready(function() {
  let account = new Account();

  $("form#new-account").submit(function(event) {
    event.preventDefault();

    var inputtedFirstLastName = $("input#new-first-last-name").val();
    var inputtedInitialDeposit = Number($("input#new-initial-deposit").val());
    
    account.addName(inputtedFirstLastName);
    account.deposit(inputtedInitialDeposit)

    $("input#new-first-last-name").val("");
    $("input#new-initial-deposit").val("");
  
    displayAccountBalance(account);
  });

  $("form#transactions").submit(function(event) {
    event.preventDefault();
   
    var inputtedDeposit = Number($("input#new-deposit-amount").val());
    var inputtedWithdrawal = Number($("input#new-withdrawal-amount").val());
    
    $("input#new-deposit-amount").val("");
    $("input#new-withdrawal-amount").val("");

    if(inputtedDeposit) {
      account.deposit(inputtedDeposit);
    } 
    else if (inputtedWithdrawal) {
      account.withdraw(inputtedWithdrawal);
    }    

    displayAccountBalance(account);
  });
});