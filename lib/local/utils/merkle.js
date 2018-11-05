const crypto = require('crypto');
const through = require('through');
const { sha3 } = require('./index')


// ================================================= bitcoin-merkle-root =================================================
// exports.help = () => {
//   console.log("The YggdrashMerkleRoot method will calculate the Merkel root tree of a list of transaction hashes placed in an array");

// }

// let ygm_recursive = (hashList) => {
//   while(true)
//   {
//     if (hashList.length === 1) return hashList[0];
//     let newHashList = [];
//     let len = (hashList.length % 2 !== 0) ? hashList.length -1 : hashList.length;
//     for(let i = 0; i < len; i += 2 ) newHashList.push(hash2(hashList[i], hashList[i+1]));
//     if(len < hashList.length)  newHashList.push(hash2(hashList[hashList.length-1], hashList[hashList.length-1]));  
//     hashList = newHashList;
//   }
// }

// function hash2 (a,b) { 
//     let a1 = (new Buffer(a, "hex")).reverse();
//     let b1 = (new Buffer(b, "hex")).reverse();  
//     let c = (Buffer.concat([a1,b1]));    
//     let firstHash = sha3(c);
//     let hashOfHash = sha3(firstHash);
//     // let firstHash = crypto.createHash('sha256').update(c).digest();
//     // let hashOfHash =  crypto.createHash('sha256').update(firstHash).digest();
//     hashOfHash.reverse();   
//     return (hashOfHash.toString('hex'));
// }

// exports.YggdrashMerkleRoot = ygm_recursive;
//bitcoin-merkle-root
//1e5c77a72680e39a11319e769fa085e9437defd8fc7ade848efb8b92759b2d06


// ================================================= merkle-lib =================================================
// module.exports = function fastRoot (values, digestFn) {
//   if (!Array.isArray(values)) throw TypeError('Expected values Array')
//   if (typeof digestFn !== 'function') throw TypeError('Expected digest Function')

//   var length = values.length
//   var results = values.concat()

//   while (length > 1) {
//     var j = 0

//     for (var i = 0; i < length; i += 2, ++j) {
//       var left = results[i]
//       var right = i + 1 === length ? left : results[i + 1]
//       var data = Buffer.concat([left, right])

//       results[j] = digestFn(data)
//     }

//     length = j
//   }

//   return results[0]
// }
// merkle-lib
// db14a01e9ce664bd0afc75513fed94a5bf84275ec0f5d21fb3e2e66be6efe551


// ================================================= merkle =================================================
// var REGEXP = {
//   'md5':       "^[0-9a-f]{32}$",
//   'sha1':      "^[0-9a-f]{40}$",
//   'ripemd160': "^[0-9a-f]{40}$",
//   'keccak256': "^[0-9a-f]{64}$",
//   'sha256':    "^[0-9a-f]{64}$",
//   'sha512':    "^[0-9a-f]{128}$",
//   'whirlpool': "^[0-9a-f]{128}$",
//   'DEFAULT':   "^$"
// };

// function Merkle (hashFunc, hashFuncName, useUpperCaseForHash) {

//   var that = this;

//   var resFunc = function () {
//     return root();
//   };

//   var regexpStr = REGEXP[hashFuncName] || REGEXP.DEFAULT;
//   if (useUpperCaseForHash) {
//     // Use only capital letters if upper case is enabled
//     regexpStr = regexpStr.replace('a', 'A').replace('f', 'F');
//   }
//   that.hashResultRegexp = new RegExp(regexpStr);
//   that.leaves = [];
//   that.treeDepth = 0;
//   that.rows = [];
//   that.nodesCount = 0;

//   function feed(anyData) {
//     var data = String(anyData);
//     if(data && data.match(that.hashResultRegexp)){
//       // Push leaf without hashing it since it is already a hash
//       that.leaves.push(data);
//     }
//     else{
//       var hash = hashFunc(data);
//       if (useUpperCaseForHash) {
//         hash = hash;
//       }
//       that.leaves.push(hash);
//     }
//     return that;
//   }

//   function depth() {
//     // Compute tree depth
//     if(!that.treeDepth){
//       var pow = 0;
//       while(Math.pow(2, pow) < that.leaves.length){
//         pow++;
//       }
//       that.treeDepth = pow;
//     }
//     return that.treeDepth;
//   }

//   function levels() {
//     return depth() + 1;
//   }

//   function nodes() {
//     return that.nodesCount;
//   }

//   function root() {
//     return that.rows[0][0];
//   }

//   function level(i) {
//     return that.rows[i];
//   }

//   function compute() {
//     var theDepth = depth();
//     if(that.rows.length == 0){
//       // Compute the nodes of each level
//       for (var i = 0; i < theDepth; i++) {
//         that.rows.push([]);
//       }
//       that.rows[theDepth] = that.leaves;
//       for (var j = theDepth-1; j >= 0; j--) {
//         that.rows[j] = getNodes(that.rows[j+1]);
//         that.nodesCount += that.rows[j].length;
//       }
//     }
//   }

//   function getNodes(leaves) {
//     var remainder = leaves.length % 2;
//     var nodes = [];
//     var hash;
//     for (var i = 0; i < leaves.length - 1; i = i + 2) {
//       hash = hashFunc(leaves[i] + leaves[i+1]);
//       if (useUpperCaseForHash) {
//         hash = hash;
//       }
//       nodes[i/2] = hash;
//     }
//     if(remainder === 1){
//       nodes[((leaves.length-remainder)/2)] = leaves[leaves.length - 1];
//     }
//     return nodes;
//   }
  
//   function getProofPath(index, excludeParent) {
//     var proofPath = [];

//     for (var currentLevel = depth(); currentLevel > 0; currentLevel--) {
//       var currentLevelNodes = level(currentLevel);
//       var currentLevelCount = currentLevelNodes.length;

//       // if this is an odd end node to be promoted up, skip to avoid proofs with null values
//       if (index == currentLevelCount - 1 && currentLevelCount % 2 == 1) {
//         index = Math.floor(index / 2);
//         continue;
//       }

//       var nodes = {};
//       if (index % 2) { // the index is the right node
//         nodes.left = currentLevelNodes[index - 1];
//         nodes.right = currentLevelNodes[index];
//       } else {
//         nodes.left = currentLevelNodes[index];
//         nodes.right = currentLevelNodes[index + 1];
//       }

//       index = Math.floor(index / 2); // set index to the parent index
//       if (!excludeParent) {
//         proofPath.push({
//           parent: level(currentLevel - 1)[index],
//           left: nodes.left,
//           right: nodes.right
//         });
//       } else {
//         proofPath.push({
//           left: nodes.left,
//           right: nodes.right
//         });
//       }

//     }
//     return proofPath;
//   }

//   // PUBLIC

//   /**
//   * Return the stream, with resulting stream begin root hash string.
//   **/
//   var stream = through(
//     function write (data) {
//       feed('' + data);
//     },
//     function end () {
//       compute();
//       this.emit('data', resFunc());
//       this.emit('end');
//     });

//   /**
//   * Return the stream, but resulting stream will be json.
//   **/
//   stream.json = function () {
//     resFunc = function() {
//       return {
//         root: root(),
//         level: level(),
//         depth: depth(),
//         levels: levels(),
//         nodes: nodes(),
//         getProofPath: getProofPath
//       };
//     };
//     return this;
//   };

//   /**
//   * Computes merkle tree synchronously, returning json result.
//   **/
//   stream.sync = function (leaves) {
//     leaves.forEach(function(leaf){
//       feed(leaf);
//     });
//     compute();
//     resFunc = function() {
//       return {
//         root: root,
//         level: level,
//         depth: depth,
//         levels: levels,
//         nodes: nodes,
//         getProofPath: getProofPath
//       };
//     };
//     return resFunc();
//   };

//   /**
//   * Computes merkle tree asynchronously, returning json as callback result.
//   **/
//   stream.async = function (leaves, done) {
//     leaves.forEach(function(leaf){
//       feed(leaf);
//     });
//     compute();
//     resFunc = function() {
//       return {
//         root: root,
//         level: level,
//         depth: depth,
//         levels: levels,
//         nodes: nodes,
//         getProofPath: getProofPath
//       };
//     };
//     done(null, resFunc());
//   };

//   return stream;
// }

// module.exports = function (hashFuncName, useUpperCaseForHash) {
//   return new Merkle(function (input) {
//     if (hashFuncName === 'none') {
//       return input;
//     } else {
//       return sha3(input);
//     }
//   }, hashFuncName,

//   // Use upper case y default
//   useUpperCaseForHash !== false);
// };
// merkle
// 17962cd55674ec2815abee589d1ba658830de8391ffdb337b19dd2935cfe8250



// ================================================= merkle-tools =================================================
// var sha3512 = require('js-sha3').sha3_512
// var sha3384 = require('js-sha3').sha3_384
// var sha3256 = require('js-sha3').sha3_256
// var sha3224 = require('js-sha3').sha3_224

// var MerkleTools = function (treeOptions) {
//   // in case 'new' was omitted
//   if (!(this instanceof MerkleTools)) {
//     return new MerkleTools(treeOptions)
//   }

//   var hashType = 'sha256'
//   if (treeOptions) { // if tree options were supplied, then process them
//     if (treeOptions.hashType !== undefined) { // set the hash function to the user's choice
//       hashType = treeOptions.hashType
//     }
//   }

//   var hashFunction = function (value) {
//     switch (hashType) {
//       case 'SHA3-224':
//         return Buffer.from(sha3224.array(value))
//       case 'SHA3-256':
//         return Buffer.from(sha3256.array(value))
//       case 'SHA3-384':
//         return Buffer.from(sha3384.array(value))
//       case 'SHA3-512':
//         return Buffer.from(sha3512.array(value))
//       case 'KECCAK-256':
//         return sha3(value) 
//       default:
//         return crypto.createHash(hashType).update(value).digest()
//     }
//   }

//   var tree = {}
//   tree.leaves = []
//   tree.levels = []
//   tree.isReady = false

//   /// /////////////////////////////////////////
//   // Public Primary functions
//   /// /////////////////////////////////////////

//   // Resets the current tree to empty
//   this.resetTree = function () {
//     tree = {}
//     tree.leaves = []
//     tree.levels = []
//     tree.isReady = false
//   }

//   // Add a leaf to the tree
//   // Accepts hash value as a Buffer or hex string
//   this.addLeaf = function (value, doHash) {
//     tree.isReady = false
//     if (doHash) value = hashFunction(value)
//     tree.leaves.push(_getBuffer(value))
//   }

//   // Add a leaves to the tree
//   // Accepts hash values as an array of Buffers or hex strings
//   this.addLeaves = function (valuesArray, doHash) {
//     tree.isReady = false
//     valuesArray.forEach(function (value) {
//       if (doHash) value = hashFunction(value)
//       tree.leaves.push(_getBuffer(value))
//     })
//   }

//   // Returns a leaf at the given index
//   this.getLeaf = function (index) {
//     if (index < 0 || index > tree.leaves.length - 1) return null // index is out of array bounds

//     return tree.leaves[index]
//   }

//   // Returns the number of leaves added to the tree
//   this.getLeafCount = function () {
//     return tree.leaves.length
//   }

//   // Returns the ready state of the tree
//   this.getTreeReadyState = function () {
//     return tree.isReady
//   }

//   // Generates the merkle tree
//   this.makeTree = function (doubleHash) {
//     tree.isReady = false
//     var leafCount = tree.leaves.length
//     if (leafCount > 0) { // skip this whole process if there are no leaves added to the tree
//       tree.levels = []
//       tree.levels.unshift(tree.leaves)
//       while (tree.levels[0].length > 1) {
//         tree.levels.unshift(_calculateNextLevel(doubleHash))
//       }
//     }
//     tree.isReady = true
//   }

//   // Generates a Bitcoin style merkle tree
//   this.makeBTCTree = function (doubleHash) {
//     tree.isReady = false
//     var leafCount = tree.leaves.length
//     if (leafCount > 0) { // skip this whole process if there are no leaves added to the tree
//       tree.levels = []
//       tree.levels.unshift(tree.leaves)
//       while (tree.levels[0].length > 1) {
//         tree.levels.unshift(_calculateBTCNextLevel(doubleHash))
//       }
//     }
//     tree.isReady = true
//   }

//   // Returns the merkle root value for the tree
//   this.getMerkleRoot = function () {
//     if (!tree.isReady || tree.levels.length === 0) return null
//     return tree.levels[0][0]
//   }

//   // Returns the proof for a leaf at the given index as an array of merkle siblings in hex format
//   this.getProof = function (index, asBinary) {
//     if (!tree.isReady) return null
//     var currentRowIndex = tree.levels.length - 1
//     if (index < 0 || index > tree.levels[currentRowIndex].length - 1) return null // the index it out of the bounds of the leaf array

//     var proof = []
//     for (var x = currentRowIndex; x > 0; x--) {
//       var currentLevelNodeCount = tree.levels[x].length
//       // skip if this is an odd end node
//       if (index === currentLevelNodeCount - 1 && currentLevelNodeCount % 2 === 1) {
//         index = Math.floor(index / 2)
//         continue
//       }

//       // determine the sibling for the current index and get its value
//       var isRightNode = index % 2
//       var siblingIndex = isRightNode ? (index - 1) : (index + 1)

//       if (asBinary) {
//         proof.push(Buffer.from(isRightNode ? [0x00] : [0x01]))
//         proof.push(tree.levels[x][siblingIndex])
//       } else {
//         var sibling = {}
//         var siblingPosition = isRightNode ? 'left' : 'right'
//         var siblingValue = tree.levels[x][siblingIndex].toString('hex')
//         sibling[siblingPosition] = siblingValue

//         proof.push(sibling)
//       }

//       index = Math.floor(index / 2) // set index to the parent index
//     }

//     return proof
//   }

//   // Takes a proof array, a target hash value, and a merkle root
//   // Checks the validity of the proof and return true or false
//   this.validateProof = function (proof, targetHash, merkleRoot, doubleHash) {
//     targetHash = _getBuffer(targetHash)
//     merkleRoot = _getBuffer(merkleRoot)
//     if (proof.length === 0) return targetHash.toString('hex') === merkleRoot.toString('hex') // no siblings, single item tree, so the hash should also be the root

//     var proofHash = targetHash
//     for (var x = 0; x < proof.length; x++) {
//       if (proof[x].left) { // then the sibling is a left node
//         if (doubleHash) { proofHash = hashFunction(hashFunction(Buffer.concat([_getBuffer(proof[x].left), proofHash]))) } else { proofHash = hashFunction(Buffer.concat([_getBuffer(proof[x].left), proofHash])) }
//       } else if (proof[x].right) { // then the sibling is a right node
//         if (doubleHash) { proofHash = hashFunction(hashFunction(Buffer.concat([proofHash, _getBuffer(proof[x].right)]))) } else { proofHash = hashFunction(Buffer.concat([proofHash, _getBuffer(proof[x].right)])) }
//       } else { // no left or right designation exists, proof is invalid
//         return false
//       }
//     }

//     return proofHash.toString('hex') === merkleRoot.toString('hex')
//   }

//   /// ///////////////////////////////////////
//   // Private Utility functions
//   /// ///////////////////////////////////////

//   // Internally, trees are made of nodes containing Buffer values only
//   // This helps ensure that leaves being added are Buffers, and will convert hex to Buffer if needed
//   function _getBuffer (value) {
//     if (value instanceof Buffer) { // we already have a buffer, so return it
//       return value
//     } else if (_isHex(value)) { // the value is a hex string, convert to buffer and return
//       return Buffer.from(value, 'hex')
//     } else { // the value is neither buffer nor hex string, will not process this, throw error
//       throw new Error("Bad hex value - '" + value + "'")
//     }
//   }

//   function _isHex (value) {
//     var hexRegex = /^[0-9A-Fa-f]{2,}$/
//     return hexRegex.test(value)
//   }

//   // Calculates the next level of node when building the merkle tree
//   // These values are calcalated off of the current highest level, level 0 and will be prepended to the levels array
//   function _calculateNextLevel (doubleHash) {
//     var nodes = []
//     var topLevel = tree.levels[0]
//     var topLevelCount = topLevel.length
//     for (var x = 0; x < topLevelCount; x += 2) {
//       if (x + 1 <= topLevelCount - 1) { // concatenate and hash the pair, add to the next level array, doubleHash if requested
//         if (doubleHash) {
//           nodes.push(hashFunction(hashFunction(Buffer.concat([topLevel[x], topLevel[x + 1]]))))
//         } else {
//           nodes.push(hashFunction(Buffer.concat([topLevel[x], topLevel[x + 1]])))
//         }
//       } else { // this is an odd ending node, promote up to the next level by itself
//         nodes.push(topLevel[x])
//       }
//     }
//     return nodes
//   }

//   // This version uses the BTC method of duplicating the odd ending nodes
//   function _calculateBTCNextLevel (doubleHash) {
//     var nodes = []
//     var topLevel = tree.levels[0]
//     var topLevelCount = topLevel.length
//     if (topLevelCount % 2 === 1) { // there is an odd count, duplicate the last element
//       topLevel.push(topLevel[topLevelCount - 1])
//     }
//     for (var x = 0; x < topLevelCount; x += 2) {
//       // concatenate and hash the pair, add to the next level array, doubleHash if requested
//       if (doubleHash) {
//         nodes.push(hashFunction(hashFunction(Buffer.concat([topLevel[x], topLevel[x + 1]]))))
//       } else {
//         nodes.push(hashFunction(Buffer.concat([topLevel[x], topLevel[x + 1]])))
//       }
//     }
//     return nodes
//   }
// }

// module.exports = MerkleTools
// merkle-tools 
// sha3-256 
// 986876d612126fa30278bb552d64f60141c539e1eb54b50d6f2be6d64df89981
// keccak256
// db14a01e9ce664bd0afc75513fed94a5bf84275ec0f5d21fb3e2e66be6efe551