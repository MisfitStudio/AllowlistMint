1. replace .env 


PRIVATE_KEY = contract owner's private key


METADATA_URI = dynamically passed only to scripts/setBaseUri.js

TEST_PRIVATE_KEY = customer keys array

RECEIVE_WALLET_ADDRESS = receive money wallet
2. yarn rinkeby-test


3. set to salesId 0 *(buggy)

4. launch new salesId

yarn hardhat run scripts/setSaleId.js

5. sign and redeem new vouchers

yarn hardhat run scripts/sign_redeem.js


---  reveal

yarn hardhat run scripts/setBaseURI.js


-- withdraw 
yarn hardhat run scripts/withdraw.js
