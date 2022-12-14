const fs = require('fs/promises')
const safe = "https://safe-transaction-mainnet.safe.global/api/"

async function main() {
  let safeAddress = process.argv[2]

  let txs = []
  let next = `${safe}v1/safes/${safeAddress}/all-transactions/?` + new URLSearchParams({
    executed: "true",
    queued: "false",
  })

  // Paginate through Safe txs
  console.log('Fetching Safe transactions . . .')
  while(next)
    await fetch(next).then(res => res.json())
    .then(json => {
      next = json.next
      txs = txs.concat(json.results)
    })
    
  // Filter for duplicate transaction hashes (from batch execution), undefined executors, and starting timestamp
  console.log('Processing transactions . . .')
  const prevDate = new Date(process.argv[3] * 1000)
  txs = txs.filter((el, i) => 
    i === txs.findIndex((t => (
      t.transactionHash === el.transactionHash
    ))) && el.executor && new Date(el.executionDate) > prevDate)
  
  // Sum fees from each address
  let refunds = []
  txs.forEach(el => {
    let index = refunds.findIndex(val => val.to === el.executor)
    if(index === -1)
      refunds.push({
        to: el.executor,
        value: parseInt(el.fee),
      })
    else
      refunds[index].value += parseInt(el.fee)
  })

  // Convert fee numbers to strings
  refunds.forEach(el => el.value = el.value.toString())

  let output = {
    chainId: "1",
    createdAt: new Date().getTime(),
    meta: {
      name: "Gaswoman Transaction Bundle",
    },
    transactions: refunds,
  }

  // Write output file
  console.log('Writing output to refunds.json. . .')
  await fs.writeFile('./refunds.json', JSON.stringify(output))

  console.log(refunds)
}

main()
