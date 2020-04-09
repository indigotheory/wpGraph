import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  NewFoodItem,
  NewEmployer,
  NewWorker,
  NewGig
} from "../generated/Contract/Contract"

import { 
  log, 
  Bytes } from '@graphprotocol/graph-ts'

import { Food, Employer, Worker, Gig } from "../generated/schema"

import { loadFromIpfs } from "./ipfs";
import { TransactionInfo } from "./transaction";

export function handleNewFoodItem(event: NewFoodItem): void {
  let entity = new Food(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  let vendorAccount = event.transaction.from;
  let ipfsBytes = event.params.metadata;
  let bytes32toHex = ipfsBytes.toHexString()
  let ipfsHashHex = '1220' + bytes32toHex.slice(2)
  ipfsHashHex = '0x' + ipfsHashHex

  log.info('Hows everything {} {}', [bytes32toHex, ipfsHashHex])
  
  let ipfsHashBytes = Bytes.fromHexString(ipfsHashHex)
  let ipfsHash = ipfsHashBytes.toBase58()
  
  log.info("IPFS HASH: {}", [ipfsHash])

  if (ipfsHash != 'Qmczmh7cYdGeUDpGL5YGtwtCs2WynhuFQTJmnHGevtzsKo') {
    let tx: TransactionInfo
    
    tx.blockNumber = event.block.number.toI32()
    tx.timestamp = event.block.timestamp.toI32()
    tx.from = event.transaction.from
    tx.hash = event.transaction.hash
    tx.state.ipfsReqs = 0

    log.info("Vendor is {}", [vendorAccount.toHexString()])
    let ipfsData = loadFromIpfs(ipfsHash, tx)

    log.debug("IPFS HASH is: {}", [ipfsHash.toString()])
    log.debug("Transaction (Tx): {}", [tx.toString()])
    log.info("IPFS DATA is {}", [ipfsData.get("price").toString()])
    log.info("IPFS DATA is {}", [ipfsData.get("description").toString()])


    entity.vendorAccount = vendorAccount.toHexString();
    entity.price = ipfsData.get("price").toString();
    entity.description = ipfsData.get("description").toString();

    entity.save()
  }
}


export function handleNewEmployer(event: NewEmployer): void {
  let entity = new Employer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  let account = event.params.account;
  let ipfsBytes = event.params.metadata;
  let bytes32toHex = ipfsBytes.toHexString()
  let ipfsHashHex = '1220' + bytes32toHex.slice(2)
  ipfsHashHex = '0x' + ipfsHashHex

  log.info('Hows everything {} {}', [bytes32toHex, ipfsHashHex])
  
  let ipfsHashBytes = Bytes.fromHexString(ipfsHashHex)
  let ipfsHash = ipfsHashBytes.toBase58()
  
  log.info("IPFS HASH: {}", [ipfsHash])

  let tx: TransactionInfo
  
  tx.blockNumber = event.block.number.toI32()
  tx.timestamp = event.block.timestamp.toI32()
  tx.from = event.transaction.from
  tx.hash = event.transaction.hash
  tx.state.ipfsReqs = 0

  // log.info("Vendor is {}", [vendor.toHexString()])
  let ipfsData = loadFromIpfs(ipfsHash, tx)

  log.debug("IPFS HASH is: {}", [ipfsHash.toString()])
  log.debug("Transaction (Tx): {}", [tx.toString()])

  entity.account = account.toHexString();
  entity.name = ipfsData.get("name").toString();
  entity.city = ipfsData.get("city").toString();
  entity.state = ipfsData.get("state").toString();
  entity.zipcode = ipfsData.get("zipcode").toBigInt();

  entity.save()
}

export function handleNewWorker(event: NewWorker): void {
  let entity = new Worker(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  let account = event.params.account;
  let ipfsBytes = event.params.metadata;
  let bytes32toHex = ipfsBytes.toHexString()
  let ipfsHashHex = '1220' + bytes32toHex.slice(2)
  ipfsHashHex = '0x' + ipfsHashHex

  log.info('Hows everything {} {}', [bytes32toHex, ipfsHashHex])
  
  let ipfsHashBytes = Bytes.fromHexString(ipfsHashHex)
  let ipfsHash = ipfsHashBytes.toBase58()
  
  log.info("IPFS HASH: {}", [ipfsHash])

  let tx: TransactionInfo
  
  tx.blockNumber = event.block.number.toI32()
  tx.timestamp = event.block.timestamp.toI32()
  tx.from = event.transaction.from
  tx.hash = event.transaction.hash
  tx.state.ipfsReqs = 0

  // log.info("Vendor is {}", [vendor.toHexString()])
  let ipfsData = loadFromIpfs(ipfsHash, tx)

  log.debug("IPFS HASH is: {}", [ipfsHash.toString()])
  log.debug("Transaction (Tx): {}", [tx.toString()])


  entity.account = account.toHexString();
  entity.name = ipfsData.get("name").toString();

  entity.save()
}

export function handleNewGig(event: NewGig): void {
  let entity = new Gig(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )

  let account = event.params.employer;
  let ipfsBytes = event.params.metadata;
  let bytes32toHex = ipfsBytes.toHexString()
  let ipfsHashHex = '1220' + bytes32toHex.slice(2)
  ipfsHashHex = '0x' + ipfsHashHex

  log.info('Hows everything {} {}', [bytes32toHex, ipfsHashHex])
  
  let ipfsHashBytes = Bytes.fromHexString(ipfsHashHex)
  let ipfsHash = ipfsHashBytes.toBase58()
  
  log.info("IPFS HASH: {}", [ipfsHash])

  let tx: TransactionInfo
  
  tx.blockNumber = event.block.number.toI32()
  tx.timestamp = event.block.timestamp.toI32()
  tx.from = event.transaction.from
  tx.hash = event.transaction.hash
  tx.state.ipfsReqs = 0

  // log.info("Vendor is {}", [vendor.toHexString()])
  let ipfsData = loadFromIpfs(ipfsHash, tx)

  log.debug("IPFS HASH is: {}", [ipfsHash.toString()])
  log.debug("Transaction (Tx): {}", [tx.toString()])


  entity.employer = account.toHexString();
  entity.title = ipfsData.get("title").toString();
  entity.description = ipfsData.get("description").toString();
  entity.wages = ipfsData.get("wages").toBigInt();
  entity.when = ipfsData.get("when").toString();
  entity.where = ipfsData.get("where").toString();
  entity.pickupLocation = ipfsData.get("pickupLocation").toString();
  entity.start = ipfsData.get("start").toBigInt();
  entity.end = ipfsData.get("end").toBigInt();

  entity.save()
}
