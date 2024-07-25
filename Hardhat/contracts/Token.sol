// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) private balances;

    event TokensMinted(address indexed recipient, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    function mint(address recipient, uint256 amount) public {
        balances[recipient] += amount;
        emit TokensMinted(recipient, amount);
    }

    function transfer(address recipient, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
    }

    function balanceOf(address user) public view returns (uint256) {
        return balances[user];
    }
}
