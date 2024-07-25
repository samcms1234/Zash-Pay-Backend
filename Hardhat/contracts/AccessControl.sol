// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract AccessControl {
    struct Role {
        bool exists;
        mapping(address => bool) members;
    }

    mapping(bytes32 => Role) private roles;

    event RoleCreated(bytes32 role);
    event RoleAssigned(bytes32 role, address member);
    event RoleRemoved(bytes32 role, address member);

    function createRole(bytes32 role) external {
        require(!roles[role].exists, "Role already exists");
        roles[role].exists = true;
        emit RoleCreated(role);
    }

    function assignRole(bytes32 role, address member) external {
        require(roles[role].exists, "Role does not exist");
        require(!roles[role].members[member], "Member already has role");
        roles[role].members[member] = true;
        emit RoleAssigned(role, member);
    }

    function hasRole(bytes32 role, address member) external view returns (bool) {
        return roles[role].members[member];
    }

    function removeRole(bytes32 role, address member) external {
        require(roles[role].exists, "Role does not exist");
        require(roles[role].members[member], "Member does not have role");
        roles[role].members[member] = false;
        emit RoleRemoved(role, member);
    }
}
