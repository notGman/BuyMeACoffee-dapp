// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BuyMeACoffee {
    address payable owner;
    constructor() {
        owner = payable(msg.sender);
    }

    struct Contributor{
        address contributor;
        string name;
        string message;
        uint256 amount;
    }

    Contributor[] contributions;

    modifier onlyOwner {
        require(msg.sender == owner,'Only owner can call this function');
        _;
    }

    function coffee(string memory _name, string memory _message)public payable {
        require(msg.value>=0.0001 ether,'Minimum 0.0001 required to make transaction');
        contributions.push(Contributor(msg.sender,_name,_message,msg.value));
    }

    function withdraw()public onlyOwner{
        owner.transfer(address(this).balance);
    }

    function getContributors()public view returns(Contributor[] memory){
        Contributor[] memory contributorsList = contributions;
        for(uint256 i=0; i<contributions.length; i++){
            delete contributorsList[i].amount;
        }
        return contributorsList;
    }

    function getContractBalance()public onlyOwner view returns(uint256){
        return(address(this).balance);
    }
}