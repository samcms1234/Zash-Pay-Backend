// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Identity {
    struct User {
        address userAddress;
        string name;
        string governmentId;
        string aadhaarNumber;
        bytes32 hash;
    }

    mapping(address => User) public users;

    event IdentityAdded(address indexed userAddress, string name, string governmentId, string aadhaarNumber);
    event IdentityUpdated(address indexed userAddress, string name, string governmentId, string aadhaarNumber);
    event IdentityVerified(address indexed userAddress);

    function addIdentity(address userAddress, string memory name, string memory governmentId, string memory aadhaarNumber) public {
        require(users[userAddress].hash == bytes32(0), "Identity already exists.");
        bytes32 hash = keccak256(abi.encodePacked(userAddress, name, governmentId, aadhaarNumber));
        users[userAddress] = User(userAddress, name, governmentId, aadhaarNumber, hash);
        emit IdentityAdded(userAddress, name, governmentId, aadhaarNumber);
    }

    function updateIdentity(address userAddress, string memory name, string memory governmentId, string memory aadhaarNumber) public {
        require(users[userAddress].hash != bytes32(0), "Identity does not exist.");
        bytes32 hash = keccak256(abi.encodePacked(userAddress, name, governmentId, aadhaarNumber));
        users[userAddress] = User(userAddress, name, governmentId, aadhaarNumber, hash);
        emit IdentityUpdated(userAddress, name, governmentId, aadhaarNumber);
    }

    function verifyAadhaar(address userAddress, string memory aadhaarNumber) public view returns (bool) {
        return keccak256(abi.encodePacked(users[userAddress].aadhaarNumber)) == keccak256(abi.encodePacked(aadhaarNumber));
    }
}
