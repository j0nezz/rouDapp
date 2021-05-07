pragma solidity 0.6.6;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";

contract Roulette is VRFConsumerBase {
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
    
   // contract owner
   address payable private owner;
   
   // state variables 
    bytes32 private keyHash;
    uint256 private fee;
    uint256 private minimumStake = 100000000000000000;
    
    // dict where for each game the respective bets are stored 
    mapping(bytes32 => RequestedBet) private bets;
    
    // random number and amount
    event Win(uint result, uint winningSum, address player);
    event Loose(uint result, address player);


    
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
        // 0.1 LINK
        fee = 10**17;
    
        owner = msg.sender;
    }
    
    // invoked by each user when playing
    function playGame(uint8[] memory numbers) public payable {
        // Show error in case SC owns not enough LINK token
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        
        // Show error in case stake is below minumum stake
        require(msg.value >= minimumStake, "Below minimum stake!");
        
        // Show error in case SC owns not enough money for possible payout
        require(address(this).balance >= SafeMath.mul(msg.value , SafeMath.div(36,numbers.length)), "Not enough money available on SC");
        bytes32 requestId  = requestRandomness(keyHash, fee, block.number);
        
        // save bet request in dict
        bets[requestId] = RequestedBet({
            amount: msg.value,
            numbers: numbers,
            sender: msg.sender
        });
    }
    
    
    // Get minimun stake value
    function getMinimumStake() public view returns (uint256) {
        return minimumStake;
    }
    
    // Set minimum stake amount 
    function setMinimumStake(uint256 newMinimumStake) public {
        // Show error in case requester is not owner
        require(msg.sender == owner, "Caller is not owner");
        minimumStake = newMinimumStake;
    }
    
    
    function withdrawContractMoney(uint256 amount) public payable {
        // Show error in case requester is not contract owner
        require(msg.sender == owner, "Caller is not owner");
        
        // Check if requested amount available on contract
        if(address(this).balance >= amount) {
            // Transfer ether
            owner.transfer(amount);
        }
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        // Calculate number between 0 and 36
        uint8 requestedNumber = uint8(SafeMath.mod(randomness, 37));
        
        // Is random number included in user's bet
        for(uint8 i=0; i<bets[requestId].numbers.length; i++){
            if(requestedNumber == bets[requestId].numbers[i]){
                // Transfer ether to winner 
                bets[requestId].sender.transfer(SafeMath.mul(SafeMath.div(bets[requestId].amount, 36), bets[requestId].numbers.length));
                
                // Emit win event
                emit Win(requestedNumber, SafeMath.mul(SafeMath.div(bets[requestId].amount, 36), bets[requestId].numbers.length), bets[requestId].sender);
                return;
            } 
        }
        // Emit loose event
        emit Loose(requestedNumber, bets[requestId].sender);
    }
}
