// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const path = require('path');
const { readJsonSync } = require('fs-extra');
const fs = require("fs");
const fse = require("fs-extra");

async function main() {

  const Identity = await hre.ethers.getContractFactory("Identity");
  const identity = await Identity.deploy();
  await identity.waitForDeployment();

  const CreditScoring = await hre.ethers.getContractFactory("CreditScoring");
  const creditScoring = await CreditScoring.deploy();
  await creditScoring.waitForDeployment();

  const AccessControl = await hre.ethers.getContractFactory("AccessControl");
  const accessControl = await AccessControl.deploy();
  await accessControl.waitForDeployment();

  const Loan = await hre.ethers.getContractFactory("Loan");
  const loan = await Loan.deploy();
  await loan.waitForDeployment();

  const Registry = await hre.ethers.getContractFactory("Registry");
  const registry = await Registry.deploy();
  await registry.waitForDeployment();

  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.waitForDeployment();

  const MasterControl = await hre.ethers.getContractFactory("MasterControl");
  
  const masterControl = await MasterControl.deploy(
    loan.target,
    accessControl.target,
    identity.target,
    creditScoring.target,
    token.target,
    registry.target
  );
  
  await masterControl.waitForDeployment();
  
  console.log("masterControl deployed to:", masterControl.target);

  if (fs.existsSync("../utils/ABI")) {
    // fs.rmSync("../utils/ABI/", { recursive: true, force: true });

    fse.copySync("./artifacts/contracts/MasterControl.sol/", "../utils/ABI");
    fs.writeFileSync(
      "../utils/contracts-config.json",
      `{
      "contractAddress" : "${masterControl.target}",
      "ownerAddress" : "${masterControl.runner.address}",
      "networkDeployedTo" : "${masterControl.runner.provider._networkName}"
      }
    `
    );
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

