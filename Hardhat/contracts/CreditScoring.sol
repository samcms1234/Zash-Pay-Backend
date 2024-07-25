// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract CreditScoring {
    mapping(address => uint256) public creditScores;

    event CreditScoreUpdated(address indexed userAddress, uint256 score);

    function updateCreditScore(address userAddress, uint256 score) public {
        creditScores[userAddress] = score;
        emit CreditScoreUpdated(userAddress, score);
    }

    function calculateCreditScore(address userAddress) public {
        uint256 newScore = creditScores[userAddress] + 10;
        creditScores[userAddress] = newScore;
        emit CreditScoreUpdated(userAddress, newScore);
    }
}
