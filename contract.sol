// SPDX-License-Identifier: none
pragma solidity ^0.8.23;

contract Domegle{

    struct User {
        uint256 userIndex;
        address userAddress;
        bool isstake;
        uint currentstakeAmount;
        uint256 currentSessionId;
    }

    address private owner;
    uint256 stakeAmount = 0.005 ether;

    address[] watingPool;

    mapping(address => User) peerData;
    mapping(uint256 => address[]) sessionList;

    event sdpEmit(string _type, string _object);
    event stakeConfirmed(uint256 indexed _id, address indexed _userAddress);
    event stakeReturned(uint256 indexed _id, address indexed _userAddress);
    event stakeValueUpdated(uint256 indexed timeStemp, uint newValue);

    constructor() {
        owner = msg.sender;
    }

    modifier stakeRequire(address user) {
        require(peerData[msg.sender].isstake, "stake require");
        _;
    }

    modifier ownerOwner() {
        require(msg.sender == owner, "owner only");
        _;
    }

    function sdpEmiter(string memory _type, string memory _object) public {
        emit sdpEmit(_type, _object);
    }

    function userRegistration() public payable returns (bool) {
        require(msg.value == stakeAmount, "require stake amount");
        require(!peerData[msg.sender].isstake, "already stakeed");
        User memory newUser = User(watingPool.length, msg.sender, true, stakeAmount, 0);
        peerData[msg.sender] = newUser;
        watingPool.push(msg.sender);
        emit stakeConfirmed(watingPool.length, msg.sender);
        return true;
    }

    function matchUser(address user1, address user2) public stakeRequire(user1) stakeRequire(user2) returns (uint256) {
        address[2] memory sessionUser = [user1, user2];
        uint256 newSessionId = block.timestamp;
        sessionList[newSessionId] = sessionUser;
        peerData[user1].currentSessionId = newSessionId;
        peerData[user2].currentSessionId = newSessionId;
        // emit updateSessionId(newSessionId, user1, user2);
        return newSessionId;
    }

    function stakeReturnProcess() public payable returns (bool) {
        require(peerData[msg.sender].isstake, "no stake avail");
        (bool refund, ) = address(msg.sender).call{value: peerData[msg.sender].currentstakeAmount}("");
        if (refund) {
            delete peerData[msg.sender];
        }
        emit stakeReturned(peerData[msg.sender].userIndex, msg.sender);
        return refund;
    }

    function getUserData() public view returns(User memory){
        return peerData[msg.sender];
    }

    function getActiveUser() public view returns(address[] memory){
        return watingPool;
    }

    function updatestakeValue(uint newstakeValue) public ownerOwner returns(bool) {
        stakeAmount = newstakeValue;
        emit stakeValueUpdated(block.timestamp, newstakeValue);
        return true;
    }

}