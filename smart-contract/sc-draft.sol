pragma solidity 0.6.6;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";

contract Roulette is VRFConsumerBase {
   // contract owner
   address payable private owner;
   
   // state variables 
    bytes32 internal keyHash;
    uint256 internal fee;
    
    // dict where for each game the respective bets are stored 
    mapping(bytes32 => RequestedBet) public bets;

    
    
    
    // custom defined types to group several variables
    struct Bet { 
           uint256 amount;
           uint8[] numbers;
    }
    
    struct RequestedBet { 
           uint256 amount;
           uint8[] numbers;
           address payable sender;
    }
    
    /**
     * Constructor inherits VRFConsumerBase
     * 
     * Network: Rinkeby
     * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
     * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
     * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
     */
    constructor() 
        VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token
        ) public payable
    {
        keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        // fee = 0.1 * 10 ** 18; // 0.1 LINK (Varies by network)
        fee = SafeMath.mul(1, 10**18);
    
        owner = msg.sender;
    }
    
    // invoked by each user when playing
    function playGame(uint8[] memory numbers, uint256 userProvidedSeed) public payable{
        // require(getContractBalance() >= (msg.value * (36/numbers.length)), "Not enough money available");
        require(getContractBalance() >= SafeMath.mul(msg.value , SafeMath.div(36,numbers.length)), "Not enough money available");
        bytes32 requestId  = requestRandomness(keyHash, fee, userProvidedSeed);
        bets[requestId] = RequestedBet({
            amount: msg.value,
            numbers: numbers,
            sender: msg.sender
        });
    }
    /** 
     * Requests randomness from a user-provided seed
     */
    function getRandomNumber(uint256 userProvidedSeed) public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee, userProvidedSeed);
    }

    // random number and amount
    event Win(uint result, uint winningSum, address player);
    event Loose(uint result, address player);

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        // uint8 requestedNumber = uint8(randomness%37); // True => Winner pay out // False => Looser do nothing
        uint8 requestedNumber = uint8(SafeMath.mod(randomness, 37));
        for(uint8 i=0; i<bets[requestId].numbers.length; i++){
            if(requestedNumber == bets[requestId].numbers[i]){
                // bets[requestId].sender.transfer((bets[requestId].amount/36)*bets[requestId].numbers.length);
                bets[requestId].sender.transfer(SafeMath.mul(SafeMath.div(bets[requestId].amount, 36), bets[requestId].numbers.length));
                // emit Win(requestedNumber, (bets[requestId].amount/36)*bets[requestId].numbers.length, bets[requestId].sender);
                emit Win(requestedNumber, SafeMath.mul(SafeMath.div(bets[requestId].amount, 36), bets[requestId].numbers.length), bets[requestId].sender);
                return;
            } 
        }
        emit Loose(requestedNumber, bets[requestId].sender);
    }
    
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    function withdrawContractMoney(uint256 amount) public payable {
        require(msg.sender == owner, "Caller is not owner");
        
        if(getContractBalance() >= amount) {
            owner.transfer(amount);
        }
        
    }
    

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}
