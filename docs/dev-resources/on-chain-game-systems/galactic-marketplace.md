# Galactic Marketplace

## Introduction

<table><thead><tr><th width="170.57142857142856">Mainnet Key Label</th><th>Program Address</th></tr></thead><tbody><tr><td>Program ID</td><td><code>traderDnaR5w6Tcoi3NFm53i48FTDNbGjBSZwWXDRrg</code></td></tr></tbody></table>

The Galactic Marketplace is a decentralized trading protocol on the Solana blockchain that provides an MMO Auction House experience as a public utility.

At a glance:

* Fast and responsive data
* Fully decentralized peer-to-peer trading through an MMO auction house-style experience
* Easy integration with decentralized applications and protocols

As a user, here are some of the things you're able to do with the Galactic Marketplace:

* Create your own buy and sell orders for any Solana token
  * Query, view, and cancel your existing orders
* Buy from and sell into other people's orders

#### Technical Overview

::: warning
If you're using `GmClientService` to fetch order data, you can expect `price` field of an `Order` to be the price in base units. Use `uiPrice` to retrieve a decimal-adjusted value.
:::

<pre class="language-typescript"><code class="lang-typescript"><strong>import { BN } from 'bn.js';
</strong><strong>
</strong><strong>class Order {
</strong>  id: string;
  orderMint: string;
  currencyMint: string;
  currencyDecimals: number;
  orderOriginationQty: number;
  orderQtyRemaining: number;
  orderType: OrderSide;
  owner: string;
  ownerAssetTokenAccount: string;
  ownerCurrencyTokenAccount: string;
  price: BN;
  uiPrice: number;
};
</code></pre>

```typescript
enum OrderSide {
  Buy = 'buy',
  Sell = 'sell',
}
```

#### What items can be traded on the Galactic Marketplace?

Any arbitrary `itemMint` can be transacted permissionlessly. This can be any tokenized asset including SFTs and NFTs.

#### What currency pairs are valid on the Galactic Marketplace?

There are a limited number of valid `currencyMint` options:

<table><thead><tr><th width="150">Token Symbol</th><th>Mainnet Address</th></tr></thead><tbody><tr><td>ATLAS</td><td><code>ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx</code></td></tr><tr><td>USDC</td><td><code>EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v</code></td></tr></tbody></table>

## Services and Examples

### GmClientService

#### What is it?

The `GmClientService` is used to:

* Construct Solana transactions to interact with the Galactic Marketplace
  * Creating orders
  * Canceling orders
  * Filling orders
* Fetch metadata about registered currencies
* Fetch lists of open orders for combinations of:
  * Specific mints
  * User PublicKeys
  * Specific currencies

::: info
See the [TypeDocs](https://staratlasmeta.github.io/factory/classes/GmClientService.html) for a full list of `GmClientService` methods
:::

#### Fetch a list of supported currencies

Because the currency information is unlikely to change often this result will be cached for the lifecycle of `GmClientService` to reduce the total number of RPC calls made. If you wish to forcefully refetch this information pass `true` as an optional argument into `getRegisteredCurrencies()`.

```typescript
import { Connection, PublicKey } from '@solana/web3.js';
import { GmClientService } from '@staratlas/factory';

const connection = new Connection();
const programId = new PublicKey();

const gmClientService = new GmClientService();

const currencyInfo = await gmClientService.getRegisteredCurrencies(
  connection,
  programId,
  false, // or true to invalidate the cache
);

console.log(currencyInfo);

```

#### Fetch all open orders

Retrieve a list of all open orders for all currencies and items in the Galactic Marketplace.

```typescript
import { Connection, PublicKey } from '@solana/web3.js';
import { GmClientService } from '@staratlas/factory';

const connection = new Connection();
const programId = new PublicKey();

const gmClientService = new GmClientService();

const allOrders = await gmpClientService.getAllOpenOrders(connection, programId);

console.log(allOrders);

```

#### Create an order

Create an order for `itemMint` - use `orderSide` to specify the direction of the trade.

When creating a `Sell` order, the `orderCreator` must deposit their `itemMint` into escrow and likewise when creating a `Buy` order they must deposit their `quoteMint` into escrow.

```typescript
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { GmClientService, OrderSide } from '@staratlas/factory';

import MyWalletService from '../MyWalletService';

const connection = new Connection();
const orderCreator = MyWalletService.publicKey;
const itemMint = new PublicKey();
const quoteMint = new PublicKey();
const quantity = 12;
const uiPrice = 24.187;
const programId = new PublicKey();
const orderSide = OrderSide.Sell; // The user is selling their itemMint and asking for quoteMint

const gmClientService = new GmClientService();

// Note that the price should be a BN which is decimal-adjusted base token units
const price = gmClientService.getBnPriceForCurrency(
  connection,
  uiPrice,
  quoteMint,
  programId,
);

const orderTx = await gmClientService.getInitializeOrderTransaction(
  connection,
  orderCreator
  itemMint,
  quoteMint,
  quantity,
  price,
  programId,
  orderSide,
);

const transactionId = await connection.sendTransaction(
  orderTx,
  [MyWalletService.wallet],
);

console.log(transactionId);

```

#### Fill an order

Note that orders can be partially filled. For example, if a player has an order to buy 10 Pearce X4s a seller can fill 4 out of those 10 while leaving the order open for other users to interact with.

`getCreateExchangeTransaction()` will work for both selling into a `Buy` order and buying from a `Sell` order.

```typescript
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { GmClientService, Order } from '@staratlas/factory';

import MyWalletService from '../MyWalletService';

const connection = new Connection();
const orderTaker = MyWalletService.publicKey;
const purchaseQty = 4;
const programId = new PublicKey();

const gmClientService = new GmClientService();

const order = gmClientService.getOpenOrder('some_order_id');

const exchangeTx = await gmClientService.getCreateExchangeTransaction(
  connection,
  order,
  orderTaker,
  purchaseQty,
  programId,
);

const transactionId = await connection.sendTransaction(
  exchangeTx,
  [MyWalletService.wallet],
);

console.log(transactionId);

```

#### Cancel an order

Orders can be canceled as long as they are still open, whether they have been partially filled or not. If a partially filled order is canceled, the unfilled portion of the order is returned to the order creator.

```typescript
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { GmClientService, Order } from '@staratlas/factory';

import MyWalletService from '../MyWalletService';

const connection = new Connection();
const programId = new PublicKey();

const gmClientService = new GmClientService();

const order = gmpClientService.getOpenOrder('some_order_id');
const orderAccount = new PublicKey(order.id);
const orderInitializer = MyWalletService.publicKey;

const cancelTx = await gmpClientService.getCreateExchangeTransaction(
  connection,
  orderAccount,
  orderInitializer,
  programId,
);

const transactionId = await connection.sendTransaction(
  cancelTx,
  [MyWalletService.wallet],
);

console.log(transactionId);

```

### GmOrderbookService

::: warning
Because the marketplace is fully decentralized, the methods on this service will return orders for **all** items being transacted on the Galactic Marketplace, even items which were **not** created by Star Atlas.

If you want to be sure an item was minted for Star Atlas use the [Galaxy API](/dev-resources/apis-and-data/galaxy-api/items) to fetch this list.
:::

#### What is it?

The `GmOrderbookService` is a read-only data caching layer which maintains a real-time list of all of the open orders on the Galactic Marketplace.

::: info
See the [TypeDocs](https://staratlasmeta.github.io/factory/classes/GalacticMarketplaceService.html#loadInitialOrders) for a full list of methods
:::

#### Start the service

```typescript
import { Connection, PublicKey } from '@solana/web3.js';
import { GmOrderbookService } from '@staratlas/factory';

const programId = new PublicKey();
const connection = new Connection();

const gmOrderbookService = new GmOrderbookService(
  connection,
  programId,
);

await gmOrderbookService.start();

```

#### Get a list of all mints being transacted on the marketplace

```typescript
const allMints: string[] = gmOrderbookService.getAllMints();

console.log(allMints.length);

```

#### Get orders for a user

```typescript
import { MyWalletService } from '../MyWalletService';

const ordersForMyWallet = gmOrderbookService.getAllOrdersForUserAddress(MyWalletService.publicKey);

console.log(ordersForMyWallet.length);

```

#### Get orders for an item mint

```typescript
import { PublicKey } from '@solana/web3.js';

const itemMint = 'DdpXnnYsyUQgJby8TDHbmPwkKyGF4U6bXwCXTQZsrfKP';
const ordersForItemMint = gmOrderbookService.getAllOrdersByItemMint(itemMint);

console.log(ordersForItemMint.length);

```

#### Registering marketplace event callbacks

Class instances which implement `GmOrderbookService` can register event handlers when the marketplace state changes.

::: info
If you just need raw event callbacks without maintaining a snapshot of the on-chain marketplace state consider implementing [GmEventService](#gmpeventservice) instead
:::

#### Example

```typescript
import {
  GmEventHandler,
  GmChangeEvent,
  GmEventType,
  GmOrderbookService,
} from '@staratlas/factory';

export class MyService implements GmEventHandler {
  private gmOrderbookService: GmOrderbookService;
  
  constructor(rpcUrl: string, programId: PublicKey) {
    this.gmOrderbookService = new GmOrderbookService(rpcUrl, programId);
    
    // Register this class as an event handler
    this.gmOrderbookService.addOnEventHandler(this);
  }
  
  // onEvent will be fired any time a change occurs in the marketplace state
  onEvent(event: GmChangeEvent): void {
    switch(event.eventType) {
      case GmEventType.orderAdded:
        this.handleOrderAdded(event);
        break;
      case GmEventType.orderModified:
        this.handleOrderModified(event);
        break;
      case GmEventType.orderRemoved:
        this.handleOrderRemoved(event);
        break;
      default:
        break;
    }
  }
  
  private handleOrderAdded(event: GmChangeEvent): void {
    console.log(event.order);
  }
  
  private handleOrderModified(event: GmChangeEvent): void {
    console.log(event.order);
  }
  
  private handleOrderRemoved(event: GmChangeEvent): void {
    console.log(event.order);
  }
}

```

### GmEventService

#### What is it?

The `GmEventService` can be used to trigger an `onEvent` callback any time an order is created, modified, or canceled on the Galactic Marketplace.

::: info
The `GmEventService` is implemented by the `GmOrderbookService` and is how its internal state of the marketplace orderbooks is kept up-to-date
:::

#### Example

```typescript
import { Connection, PublicKey } from '@solana/web3.js';
import { GmEventService, GmEventType, Order} from '@staratlas/factory';

const connection = new Connection();
const programId = new PublicKey();

const eventHandler = (
  eventType: GmEventType,
  order: Order,
  slotContext: number,
) => {
  console.log(eventType, order, slotContext);
}

const gmEventService = new GmEventService(
  connection,
  programId,
);

// As events are emitted from the program eventHandler will be called
gmEventService.setEventHandler(eventHandler);

```
