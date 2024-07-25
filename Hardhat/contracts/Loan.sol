// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Loan {
    struct LoanDetails {
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        uint256 balance;
        uint256 startTime;
    }

    mapping(address => LoanDetails) public loans;
    address[] public borrowers;

    event LoanCreated(address indexed borrower, uint256 amount, uint256 interestRate, uint256 duration);
    event LoanUpdated(address indexed borrower, uint256 amount, uint256 interestRate, uint256 duration);
    event LoanPaymentMade(address indexed borrower, uint256 paymentAmount);
    event LoanClosed(address indexed borrower);

    function createLoan(address _borrower, uint256 _amount, uint256 _interestRate, uint256 _duration) public {
        borrowers.push(_borrower);
        loans[_borrower] = LoanDetails(_amount, _interestRate, _duration, _amount, block.timestamp);
        emit LoanCreated(_borrower, _amount, _interestRate, _duration);
    }

    function updateLoan(address _borrower, uint256 _amount, uint256 _interestRate, uint256 _duration) public {
        require(loans[_borrower].amount != 0, "Loan not found");
        loans[_borrower].amount = _amount;
        loans[_borrower].interestRate = _interestRate;
        loans[_borrower].duration = _duration;
        emit LoanUpdated(_borrower, _amount, _interestRate, _duration);
    }

    function makePayment(address _borrower, uint256 _paymentAmount) public {
        require(loans[_borrower].amount != 0, "Loan not found");
        loans[_borrower].balance -= _paymentAmount;
        emit LoanPaymentMade(_borrower, _paymentAmount);
    }

    function updateBalance() public {
        for (uint i = 0; i < borrowers.length; i++) {
            address borrower = borrowers[i];
            if (loans[borrower].amount != 0) {
                uint256 timeElapsed = block.timestamp - loans[borrower].startTime;
                uint256 interest = loans[borrower].balance * loans[borrower].interestRate * timeElapsed / (365 * 10**18);
                loans[borrower].balance += interest;
            }
        }
    }

    function closeLoan(address _borrower) public {
        require(loans[_borrower].amount != 0, "Loan not found");
        loans[_borrower].balance = 0;
        emit LoanClosed(_borrower);
    }
}
