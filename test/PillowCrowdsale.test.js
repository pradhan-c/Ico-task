const { expect } = require("chai");
const { BigNumber } = require("ethers");
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

    

      it("rate should be equal to 0 at the begininning ", async function () {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("PillowToken");
        const token = await Token.deploy();
        await token.deployed();
        const Crowdsale = await ethers.getContractFactory("PillowCrowdsale");
        const crowdsale = await Crowdsale.deploy("341000",owner.address,token.address);
        await crowdsale.deployed();

        expect(await crowdsale.weiRaised()).to.equal(0);
      });

      it("stage  should be equal to Presale ", async function () {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("PillowToken");
        const token = await Token.deploy();
        await token.deployed();
        const Crowdsale = await ethers.getContractFactory("PillowCrowdsale");
        const crowdsale = await Crowdsale.deploy("341000",owner.address,token.address);
        await crowdsale.deployed();

        expect(await crowdsale.stage()).to.equal(0);
      });
  
      it("wallet should equal owner ", async function () {
        const [owner] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("PillowToken");
        const token = await Token.deploy();
        await token.deployed();
        const Crowdsale = await ethers.getContractFactory("PillowCrowdsale");
        const crowdsale = await Crowdsale.deploy("341000",owner.address,token.address);
        await crowdsale.deployed();

        expect(await crowdsale.Wallet()).to.equal(owner.address);
      });

      it("should transfer tokens to crowsale address ", async function () {
        const [owner,addr1] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("PillowToken");
        const token = await Token.deploy();
        await token.deployed();
        const Crowdsale = await ethers.getContractFactory("PillowCrowdsale");
        const crowdsale = await Crowdsale.deploy("341000",owner.address,token.address);
        await crowdsale.deployed();
       
        await token.connect(owner).transfer(crowdsale.address, "100000000000000000000000000");
        expect(await token.balanceOf(crowdsale.address)).to.equal("100000000000000000000000000");
        const transactionHash = await addr1.sendTransaction({
          to: crowdsale.address,
          value: ethers.utils.parseEther("1.0"), // Sends exactly 1.0 ether
        });
        expect(await token.balanceOf(addr1.address)).to.equal("341000000000000000000000");

      });




  
  

    
  
  });