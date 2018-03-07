pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public allCampaigns;

    function createCampaign (uint minimum) public {
        address campaign = new Campaign(minimum, msg.sender);
        allCampaigns.push(campaign);
    }

    function getAllCampaigns () public view returns (address[]) {
        return allCampaigns;
    }
}


contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCounts;
        mapping (address => bool) approvals;
    }

    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping (address => bool) approvers;
    uint approversCount;

    modifier onlyManager () {
        require (msg.sender == manager);
        _;
    }
    function Campaign (uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute () public payable {
        require (msg.value > minimumContribution);

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest (
        string description,
        uint value,
        address recipient
        ) public onlyManager
    {
        Request memory request = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCounts: 0
        });

        requests.push(request);
    }

    function approveRequest (uint index) public {
        Request storage request = requests[index];

        require (approvers[msg.sender]);
        require (!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCounts++;
    }

    function finalizeRequest (uint index) public {
        Request storage request = requests[index];

        require (!request.complete);
        require (request.approvalCounts > (approversCount / 2));

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary () public view returns (
      uint, uint, uint, uint, address
    ) {
        return (
          minimumContribution,
          this.balance,
          requests.length,
          approversCount,
          manager
        );
    }

    function getRequestsCount () public view returns (uint) {
        return requests.length;
    }
}
