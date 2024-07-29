const { masterControl } = require('../config/blockchain.config');
const { logWithTimestamp } = require('../utils/logger')

async function createRole( role ) {
    try {
        await masterControl.methods.createRole(role).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', gas: 5000000 });
        logWithTimestamp(`New Role: ${role} added`);
    } catch(error) {
        logWithTimestamp(`Error: ${error.message}`);
    }
}

async function assignRole( role, member ) {
    try {
        await masterControl.methods.assignRole( role, member ).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', gas: 5000000 });
        logWithTimestamp(`Role assigned to address ${member} with role: ${role}`);
    } catch(error) {
        logWithTimestamp(`Error: ${error.message}`);
    }
}

async function removeRole( role, member ) {
    try {
        await masterControl.methods.removeRole( role, member ).send({ from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266', gas: 5000000 });
        logWithTimestamp(`${role} role assigned address ${member} removed`);
    } catch(error) {
        logWithTimestamp(`Error: ${error.message}`);
    }
}

module.exports = {
    createRole,
    assignRole,
    removeRole
}