// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const CounterModule = buildModule("CounterModule", (m) => {
  const token = m.contract("Counter");

  return { token };
});

module.exports = CounterModule;