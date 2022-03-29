const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Pillow Token", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Token = await ethers.getContractFactory("PillowToken");
    const token = await Token.deploy();
    await token.deployed();

    expect(await token.name()).to.equal("PillowToken");

  });

  it("Should return the symbol", async function () {
    const Token = await ethers.getContractFactory("PillowToken");
    const token = await Token.deploy();
    await token.deployed();

    expect(await token.symbol()).to.equal("PILW");

  });

  it("Should return the name", async function () {
    const Token = await ethers.getContractFactory("PillowToken");
    const token = await Token.deploy();
    await token.deployed();

    expect(await token.decimals()).to.equal(18);

  });

  it("Should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("PillowToken");
    const token = await Token.deploy();
    await token.deployed();
    const ownerBalance = await token.balanceOf(owner.address);
    expect(await token.totalSupply()).to.equal(ownerBalance);
  });

  describe("Pillow Token Transfer", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
      const [owner] = await ethers.getSigners();
  
      const Token = await ethers.getContractFactory("PillowToken");
      const token = await Token.deploy();
      await token.deployed();
  
      const ownerBalance = await token.balanceOf(owner.address);
      expect(await token.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Pillow Token Transfer", function () {
    it("Should transfer tokens between accounts", async function () {
      const [owner, addr1, addr2] = await ethers.getSigners();
  
      const Token = await ethers.getContractFactory("PillowToken");
      const token = await Token.deploy();
      await token.deployed();
  
       
    await token.transfer(addr1.address, 50);
    expect(await token.balanceOf(addr1.address)).to.equal(50);

    
    await token.connect(addr1).transfer(addr2.address, 50);
    expect(await token.balanceOf(addr2.address)).to.equal(50);
    });
  });



});