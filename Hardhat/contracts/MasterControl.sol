// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Loan.sol";
import "./AccessControl.sol";
import "./Identity.sol";
import "./CreditScoring.sol";
import "./Token.sol";
import "./Registry.sol";

contract MasterControl {
    address public owner;
    Loan public loanContract;
    AccessControl public accessControlContract;
    Identity public identityContract;
    CreditScoring public creditScoringContract;
    Token public tokenContract;
    Registry public registryContract;

    event ContractUpdated(string contractName, address newAddress);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(
        address _loanContract,
        address _accessControlContract,
        address _identityContract,
        address _creditScoringContract,
        address _tokenContract,
        address _registryContract
    ) {
        owner = msg.sender;
        loanContract = Loan(_loanContract);
        accessControlContract = AccessControl(_accessControlContract);
        identityContract = Identity(_identityContract);
        creditScoringContract = CreditScoring(_creditScoringContract);
        tokenContract = Token(_tokenContract);
        registryContract = Registry(_registryContract);
    }

    function updateLoanContract(address _loanContract) external onlyOwner {
        loanContract = Loan(_loanContract);
        emit ContractUpdated("Loan", _loanContract);
    }

    function updateAccessControlContract(address _accessControlContract) external onlyOwner {
        accessControlContract = AccessControl(_accessControlContract);
        emit ContractUpdated("AccessControl", _accessControlContract);
    }

    function updateIdentityContract(address _identityContract) external onlyOwner {
        identityContract = Identity(_identityContract);
        emit ContractUpdated("Identity", _identityContract);
    }

    function updateCreditScoringContract(address _creditScoringContract) external onlyOwner {
        creditScoringContract = CreditScoring(_creditScoringContract);
        emit ContractUpdated("CreditScoring", _creditScoringContract);
    }

    function updateTokenContract(address _tokenContract) external onlyOwner {
        tokenContract = Token(_tokenContract);
        emit ContractUpdated("Token", _tokenContract);
    }

    function updateRegistryContract(address _registryContract) external onlyOwner {
        registryContract = Registry(_registryContract);
        emit ContractUpdated("Registry", _registryContract);
    }

    function createRole(bytes32 role) external onlyOwner {
        accessControlContract.createRole(role);
    }

    function assignRole(bytes32 role, address member) external onlyOwner {
        accessControlContract.assignRole(role, member);
    }

    function removeRole(bytes32 role, address member) external onlyOwner {
        accessControlContract.removeRole(role, member);
    }

    function addIdentity(address userAddress, string memory name, string memory governmentId, string memory aadhaarNumber) public onlyOwner {
        identityContract.addIdentity(userAddress, name, governmentId, aadhaarNumber);
    }

    function updateIdentity(address userAddress, string memory name, string memory governmentId, string memory aadhaarNumber) public onlyOwner {
        identityContract.updateIdentity(userAddress, name, governmentId, aadhaarNumber);
    }

    function verifyAadhaar(address userAddress, string memory aadhaarNumber) public view returns (bool) {
        return identityContract.verifyAadhaar(userAddress, aadhaarNumber);
    }

    function updateCreditScore(address userAddress, uint256 score) public onlyOwner {
        creditScoringContract.updateCreditScore(userAddress, score);
    }

    function calculateCreditScore(address userAddress) public onlyOwner {
        creditScoringContract.calculateCreditScore(userAddress);
    }

    function mint(address recipient, uint256 amount) public onlyOwner {
        tokenContract.mint(recipient, amount);
    }

    function createLoan(address borrower, uint256 amount, uint256 interestRate, uint256 duration) public onlyOwner {
        loanContract.createLoan(borrower, amount, interestRate, duration);
    }

    function updateLoan(address borrower, uint256 amount, uint256 interestRate, uint256 duration) public onlyOwner {
        loanContract.updateLoan(borrower, amount, interestRate, duration);
    }

    function closeLoan(address borrower) public onlyOwner {
        loanContract.closeLoan(borrower);
    }
}
