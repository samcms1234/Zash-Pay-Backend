// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Registry {
    struct Entity {
        address entityAddress;
        string name;
    }

    mapping(address => Entity) public entities;
    address[] public entityList;

    event EntityRegistered(address indexed entityAddress, string name);

    function registerEntity(address entityAddress, string memory name) public {
        require(bytes(entities[entityAddress].name).length == 0, "Entity already registered");
        entities[entityAddress] = Entity(entityAddress, name);
        entityList.push(entityAddress);
        emit EntityRegistered(entityAddress, name);
    }

    function getEntities() public view returns (address[] memory) {
        return entityList;
    }
}
