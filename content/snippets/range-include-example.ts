// [!region import]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
// [!endregion import]

// [!region client]
export const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
// [!endregion client]

// [!region usage]
async function getBlockNumber() {
  const blockNumber = await client.getBlockNumber()
  console.log(blockNumber)
}
// [!endregion usage]
