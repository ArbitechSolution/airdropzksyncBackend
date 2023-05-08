const express = require('express');
const { getMerkleProof } = require('./controllers/proofController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/merkle-proof/:address', getMerkleProof);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
