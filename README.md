# Wolf-Pack Subgraph

Wolf Pack is a token based gig economy that provides an accessible labor market, identification, work history, personalized wallet, wage theft protection, and financial empowerment to the homeless.

This subgraph tracks all employers, workers, vendors profile information along with various jobs created by them and also different food items created by vendors.
Subgraph is deployed here https://thegraph.com/explorer/subgraph/nanspro/wolf-pack, you can run queries there and also use the apis in your dapp.

## Installation
```
yarn install
yarn codegen
yarn deploy
```

## Example Queries

The subgraph can be queried using graphQL queries and the endpoint for that is https://api.thegraph.com/subgraphs/name/nanspro/wolf-pack.

The following entities are present in this subgraph, below are few example queries that can be made on them

**Employer**

You can query our subgraph to obtain list of all employers on wolf pack.
``` graphql
{
employers(first: 5) {
    id
    name
    city
    state
    account
  }
}
```

- `id`: id of that employer
- `name`: Name of the employer
- `city`: City of the employer
- `state`: State of the employer
- `account`: Ethereum address of the employer


**Worker**

You can query our subgraph to obtain list of all workers on wolf pack.
``` graphql
{
workers(first: 5) {
    id
    name
    account
  }
}
```

- `id`: id of that worker
- `name`: Name of the worker
- `account`: Ethereum address of the worker

**Food**

You can query our subgraph to obtain list of all food items present on our graph.

``` graphql
{
foods(first: 5) {
    id
    description
    price
    vendor
    vendorAccount
  }
}
```

- `id`: ID
- `description`: description of the food item
- `price`: price per unit of the item
- `vendor`: vendor's name
- `vendoAccount`: vendor's ethereum address
