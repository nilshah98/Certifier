pragma solidity >=0.4.22 <0.6.0;

contract Certificate{
    
    mapping (uint => address) series;
    mapping (address => string) address_to_ipfshash;   
    
    address x;
    uint series_name = 0;
    
    function get_series_name() public view returns(uint){
        return series_name;
    }
    
    function increment_series_name() public{
        series_name++;
    } 
    
    function issue(uint _series_name) public{
        Event new_event = new Event(_series_name,msg.sender);
        x = address(new_event);
        series[_series_name] = x;
    }
    
    function get_contract_address(uint _series_name) public view returns (address){
        return series[_series_name];
    }
    
    function get_personal_ipfs_hash() public view returns (string memory){
        return address_to_ipfshash[msg.sender];
    }
    
    function update(string memory _ipfs_hash) public{
        address_to_ipfshash[msg.sender] = _ipfs_hash;
    }
}

contract Event{
    uint public series_name;
    address public issuer;
    uint public serial_id = 1;
    
    address[] public id_to_address;
    bytes32[] public id_to_ipfshash;
    
    constructor(uint _series_name, address _issuer) public{
        series_name = _series_name;
        issuer = _issuer;
    }
    
    function addcertificates(bytes32[] memory _id_to_ipfshash, address[] memory _id_to_address) public {
        id_to_address = _id_to_address;
        id_to_ipfshash = _id_to_ipfshash;
    }
    
    function getcertificate(uint _serial_id) public view returns (bytes32){
        return id_to_ipfshash[_serial_id];
    }
    
    function getcertificate2(uint _serial_id) public view returns (bytes32){
        return id_to_ipfshash[_serial_id+1];
    }
    
    function update_ipfs_hash(uint _serial_id, bytes32 _ipfs_hash, bytes32 _ipfs_hash_2) public{
        id_to_ipfshash[_serial_id] = _ipfs_hash;
        id_to_ipfshash[_serial_id+1] = _ipfs_hash_2;
    }
    
    function get_address(uint _serial_id) public view returns (address){
        return id_to_address[_serial_id];
    }
    
    //modifier onlyOwner 
    // function get_id_to_address() public view returns (address[] memory){
    //     return id_to_address;
    // }
    
    // function get_id_to_ipfshash() public view returns (bytes32[] memory){
    //     return id_to_ipfshash;
    // }
}