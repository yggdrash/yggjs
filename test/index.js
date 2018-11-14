var Ygg = require('../lib/ygg');
var assert = require("assert"); 
ygg = new Ygg(new Ygg.providers.HttpProvider("http://localhost:8080"));
var branchData = []
var transferData = []
const { Buffer } = require('safe-buffer')

describe('Branch to stem test...', function() {
	describe('seed format check.', function () {
		it('seed check', function () {
			var seed = {            
				"name": 'YEED',
	            "symbol": 'YEED',
	            "property": 'currency',
		        "type": 'immunity',
	            "description": 'YEED is the currency used inside YGGDRASH. The vitality of the new branch chain is decided by the amount of YEED, which will be consumed gradually.',
	            "tag": 0.1,
	            "version": '0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0',
	            "reference_address": '',
	            "reserve_address": '0xcee3d4755e47055b530deeba062c5bd0c17eb00f',
				"owner": '0xA771A6b5A6cAbE2ca35Fd55631717d95049D6338',
	            "version_history":['0xcc9612ff91ff844938acdb6608e58506a2f21b8a5d77e88726c0897e8d1d02c0']
			}
			
			assert(typeof seed === "object");
			const branch = ygg.client.branch(seed);
			assert(ygg.utils.isObject(branch) === true);
			branchData.push(branch)
		});

		it('Branch body check.', function () {
			assert.equal('create', branchData[0].method);
			assert(typeof branchData[0].params === "object");
			assert(branchData[0].params[0].branch.name.length !== 0 && branchData[0].params[0].branch.symbol.length !== 0)
			assert(typeof branchData[0].params[0].branch.name === "string");
			assert(typeof branchData[0].params[0].branch.symbol === "string");
			assert(typeof branchData[0].params[0].branch.property === "string");
			assert(typeof branchData[0].params[0].branch.type === "string");
			assert(typeof branchData[0].params[0].branch.description === "string");
			assert(typeof branchData[0].params[0].branch.tag === "number");
			assert(typeof branchData[0].params[0].branch.version === "string");
			assert(typeof branchData[0].params[0].branch.reference_address === "string");
			assert(typeof branchData[0].params[0].branch.reserve_address === "string");
			assert(typeof branchData[0].params[0].branch.owner === "string");
			assert.equal(42, typeof branchData[0].params[0].branch.reserve_address.length);
			assert.equal(42, typeof branchData[0].params[0].branch.owner.length);
		});

		it('Stem Transaction header check', function () {
			let timestamp = new Date().getTime();
			let jsonBody = ygg.utils.dataToJson(branchData[0]);  
			assert(typeof jsonBody === "string");
			const txHeaderData = {
				"chain":`0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7`,
				"version":`0x0000000000000000`,
				"type":`0x0000000000000000`,
				"timeStamp":`0x${ygg.utils.decimalToHex(timestamp)}`,
				"bodyHash": `0x${ygg.utils.bodyHashHex(jsonBody)}`,
				"bodyLength":`0x${ygg.utils.decimalToHex(jsonBody.length)}`
			};

			let t = ygg.utils.decimalToHex(timestamp)
			let b = ygg.utils.bodyHashHex(jsonBody)
			let bl = ygg.utils.decimalToHex(bodyJson.length)
	  
			assert(t.length === 16)
			assert(b.length === 64)
			assert(bl.length === 16)

			let tx = new ygg.tx(txHeaderData);

			tx.sign(Buffer.from('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));

			let serialize = tx.serialize(branchData[0]);
			assert(ygg.utils.isObject(serialize) === true);
		});
	});

	describe('Transfer Tests...', () => {
		it('transfer body 검증', function () {
			var to = '0xaca4215631187ab5b3af0d4c251fdf45c79ad3c6';
			var amount = 1001;
			assert.equal(42, to.length);
			const transfer = ygg.client.transfer(to, amount);
			assert(ygg.utils.isObject(transfer) === true);
			transferData.push(transfer)
		});

		it('transfer Data 검증', function () {
			assert.equal('transfer', transferData[0].method);
			assert(typeof transferData[0] === "object");
			assert(typeof transferData[0].params === "object");
			assert(transferData[0].params[0].address.length !== 0 && branchData[0].params[0].amount !== 0)
			assert(typeof transferData[0].params[0].address=== "string");
			assert(typeof transferData[0].params[0].amount === "number");
		});

		it('Branch Transaction 메서드', function () {
			let timestamp = new Date().getTime();
			let jsonBody = ygg.utils.dataToJson(transferData[0])

			const txHeaderData = {
				"chain":`0x${Buffer.from(branchData[0].params[0].branchId, 'hex').toString('hex')}`,
				"version":`0x0000000000000000`,
				"type":`0x0000000000000000`,
				"timeStamp":`0x${ygg.utils.decimalToHex(timestamp)}`,
				"bodyHash": `0x${ygg.utils.bodyHashHex(jsonBody)}`,
				"bodyLength":`0x${ygg.utils.decimalToHex(jsonBody.length)}`
			};
			
			let tx = new ygg.tx(txHeaderData);
			
			tx.sign(Buffer.from('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));
			
			let serialize = tx.serialize(transferData[0], branchData[0].params[0].branchId);
			assert(ygg.utils.isObject(serialize) === true);
			assert.equal(true, tx.verifySignature());
		});
	  })

	describe('Node Tests...', () => {

		it('body lenth should be 24.', () => {
		  let nonceBody = ygg.client.nodeHello();
		  let bodyJson = ygg.utils.dataToJson(nonceBody)
		  assert(bodyJson.length === 24)
	
		  let body = ygg.client.nodeRestart()
		  let bodyJson = ygg.utils.dataToJson(body)
		  assert(bodyJson.length === 22)
		})
	  
		it('transaction header check.', () => {
		  let timestamp = new Date().getTime()
		  let nonceBody = ygg.client.nodeHello();
		  let bodyJson = ygg.utils.dataToJson(nonceBody)
	
		  let t = ygg.utils.decimalToHex(timestamp)
		  let n = ygg.utils.nonce()
		  let b = ygg.utils.bodyHashHex(bodyJson)
		  let bl = ygg.utils.decimalToHex(bodyJson.length)
	
		  assert(t.length === 16)
		  assert(n.length === 32)
		  assert(b.length === 64)
		  assert(bl.length === 16)
		})
	  })
});