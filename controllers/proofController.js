const fs = require('fs');
const { StandardMerkleTree } = require('@openzeppelin/merkle-tree');
const data = require('../Holders/data');

const TREE_FILE_NAME = 'tree.json';

const initializeTree = () => {
	if (!fs.existsSync(TREE_FILE_NAME)) {
		const tree = StandardMerkleTree.of(data, ['address']);
		fs.writeFileSync(TREE_FILE_NAME, JSON.stringify(tree.dump()));
	}
};

const getTree = () => {
	const storedTree = JSON.parse(fs.readFileSync(TREE_FILE_NAME));
	return StandardMerkleTree.load(storedTree);
};

initializeTree();

const getMerkleProof = (req, res) => {
	const { address } = req.params;

	if (!address) {
		return res.status(400).json({ error: 'Address is required' });
	}

	try {
		const tree = getTree();
		const proof = tree.getProof([address]);
		res.status(200).json({ proof });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

module.exports = { getMerkleProof };
