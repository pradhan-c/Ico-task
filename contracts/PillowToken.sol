
// contracts/ExampleToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

//Create Total supply of 100 million in counstructor.
//The name of the token PillowToken and the symbol is PILW

contract PillowToken is ERC20 {
constructor () ERC20("PillowToken", "PILW")
{
_mint(msg.sender,100000000 * 10 ** decimals());
}
}