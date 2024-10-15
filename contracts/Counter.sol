//SPDX-License-Identifier: UNLICENSED

// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.8.7;

contract Counter {
    // State variables are stored on the blockchain.
    uint256 value;

    event Increment(string message);
    event Decrement(string message);

    function increment() external {
        value++;

        emit Increment("value incremented by 1");
    }

    function decrement() external {
        value--;

        emit Decrement("value decremented by 1");
    }

    // getter function
    function getValue() public view returns (uint256) {
        return value;
    }
}