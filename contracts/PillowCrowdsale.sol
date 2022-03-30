// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "./Crowdsale.sol";

contract PillowCrowdsale is Crowdsale, Ownable {
    using SafeMath for uint256;

    uint256 private totalSupply;
    uint256 private _currentrate;
    uint256 private _tokenSold;
    uint256 public _PreSaleTokensLeft;
    uint256 public _SeedSaleTokensLeft;
    uint256 public _FinalSaleTokensLeft;

    enum STAGE {
        PRESALE,
        SEEDSALE,
        FINALSALE
    }
    STAGE public stage;

    constructor(
        uint256 _rate,
        address payable _wallet,
        IERC20 _token
    ) Crowdsale(_rate, _wallet, _token) {
        _currentrate = _rate;
        _PreSaleTokensLeft = 30000000000000000000000000;
        _SeedSaleTokensLeft = 50000000000000000000000000;
        _FinalSaleTokensLeft = 20000000000000000000000000;
    }

    function CurrentRate() private view returns (uint256) {
        return _currentrate;
    }

    function setSTAGE(uint256 _stage) private {
        if (uint256(STAGE.PRESALE) == _stage) {
            stage = STAGE.PRESALE;
            _currentrate = 341000;
        } else if (uint256(STAGE.SEEDSALE) == _stage) {
            stage = STAGE.SEEDSALE;
            _currentrate = 170500;
        } else {
            stage = STAGE.FINALSALE;
            _currentrate = 3410;
        }
    }

    function changeDynamically(uint256 _cRate) public onlyOwner {
        _currentrate = _cRate;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount)
        internal
        override
    {
        require(
            beneficiary != address(0),
            "Crowdsale: beneficiary is the zero address"
        );
        require(weiAmount != 0, "Crowdsale: weiAmount is 0");
        uint256 _tokens = _getTokenAmount(weiAmount);
        if (stage == STAGE.PRESALE) {
            require(
                _tokens + _tokenSold <= 30000000000000000000000000,
                "No tokens left to sell in Presale or  "
            );
            _tokenSold = _tokenSold + _tokens;
            _PreSaleTokensLeft = _PreSaleTokensLeft - _tokens;

            if (_PreSaleTokensLeft == 0) {
                setSTAGE(1);
            }
        } else if (stage == STAGE.SEEDSALE) {
            require(
                _tokens + _tokenSold <= 80000000000000000000000000,
                "No tokens left to sell in Seedsale "
            );
            _tokenSold = _tokenSold + _tokens;
            _SeedSaleTokensLeft = _SeedSaleTokensLeft - _tokens;
            if (_SeedSaleTokensLeft == 0) {
                setSTAGE(2);
            }
        } else {
            require(
                _tokens + _tokenSold <= 100000000000000000000000000,
                "No tokens left to sell in FinalSale "
            );
        }
        //Update Token sold

        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
    }

    function _getTokenAmount(uint256 weiAmount)
        internal
        view
        override
        returns (uint256)
    {
        return weiAmount.mul(_currentrate);
    }
}
