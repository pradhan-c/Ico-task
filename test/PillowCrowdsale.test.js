const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("PillowTokenCrowdsale", function () {
    it("Should get deployed", async function () {
      const [owner] = await ethers.getSigners();
      const Token = await ethers.getContractFactory("PillowToken");
      const token = await Token.deploy();
      await token.deployed();
      const Crowdsale = await ethers.getContractFactory("PillowCrowdsale");
      const crowdsale = await Crowdsale.deploy("40000",owner.address,token.address);
      await crowdsale.deployed();
    });

    it("rate should be equal to 40000 ", async function () {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("PillowToken");
        const token = await Token.deploy();
        await token.deployed();
        const Crowdsale = await ethers.getContractFactory("PillowCrowdsale");
        const crowdsale = await Crowdsale.deploy("40000",owner.address,token.address);
        await crowdsale.deployed();

        expect(await crowdsale.rate()).to.equal(40000);
      });

      it("rate should be equal to 0 at the begininning ", async function () {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("PillowToken");
        const token = await Token.deploy();
        await token.deployed();
        const Crowdsale = await ethers.getContractFactory("PillowCrowdsale");
        const crowdsale = await Crowdsale.deploy("40000",owner.address,token.address);
        await crowdsale.deployed();

        expect(await crowdsale.weiRaised()).to.equal(0);
      });

      it("stage  should be equal to Presale ", async function () {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("PillowToken");
        const token = await Token.deploy();
        await token.deployed();
        const Crowdsale = await ethers.getContractFactory("PillowCrowdsale");
        const crowdsale = await Crowdsale.deploy("40000",owner.address,token.address);
        await crowdsale.deployed();

        expect(await crowdsale.stage()).to.equal(0);
      });
  
  

    
  
  });