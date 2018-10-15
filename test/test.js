var Ygg = require('../lib/ygg');
var assert = require("assert"); //nodejs에서 제공하는 aseert 모듈
ygg = new Ygg(new Ygg.providers.HttpProvider("http://localhost:8080"));
var branchData = []
describe('Stem에 브랜치 등록 테스트', function() {
	describe('스템 메서드', function () {
		it('Branch 메서드', function () {
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

		it('Transaction 메서드', function () {

			let jsonBody = ygg.utils.dataToJson(branchData[0]);  
			assert(typeof jsonBody === "string");
			const txHeaderData = {
				"chain":`0xfe7b7c93dd23f78e12ad42650595bc0f874c88f7`,
				"version":`0x0000000000000000`,
				"type":`0x0000000000000000`,
				"timeStamp":`0x${ygg.utils.decimalToHex(branchData[0].params[0].branch.timestamp)}`,
				"bodyHash": `0x${ygg.utils.bodyHashHex(jsonBody)}`,
				"bodyLength":`0x${ygg.utils.decimalToHex(jsonBody.length)}`
			};

			let tx = new ygg.tx(txHeaderData);

			const signature = tx.sign(new Buffer('3D8A58EA7FA6EF7E038791F3B837FA7BC62DC38CAAFE67AFC4D4567A64D4966E', 'hex'));

			let registerData = tx.branchRegister(branchData[0], signature);


		});

	});

	
});



// let register = ygg.client.register(registerData);