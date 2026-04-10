# Data Source

## Introduction

Abstraction over getting account updates from Solana. Supports RPC out of the box but can support other protocols through custom implementations.

`@staratlas/data-source` will help you:

* Build, Sign, and Send transactions
* Read accounts from RPC or other source
* Parse data

<table><thead><tr><th>Package</th><th>Description</th><th width="142">Version</th><th>Docs</th></tr></thead><tbody><tr><td><code>@staratlas/data-source</code></td><td>TypeScript interface for Star Atlas programs</td><td><a href="https://www.npmjs.com/package/@staratlas/data-source"><img src="https://img.shields.io/npm/v/@staratlas/data-source.svg?color=blue" alt="npm"></a></td><td><a href="https://staratlasmeta.github.io/data-source/"><img src="https://img.shields.io/badge/docs-typedoc-blue" alt="Docs"></a></td></tr></tbody></table>

## Installation

**Reference:** <https://www.npmjs.com/package/@staratlas/data-source>

```bash
npm i @staratlas/data-source
```

## Examples

**Read from RPC:**

```typescript
import { Connection } from '@solana/web3.js';
import { readAllFromRPC } from '@staratlas/data-source';
import { Fleet, SageIDLProgram } from '@staratlas/sage';

export async function readAllFleetsWarpStatus(
  connection: Connection,
  sageProgram: SageIDLProgram
): Promise<void> {
  const fleets = (await readAllFromRPC(connection, sageProgram, Fleet)).map(
    (fleet) => fleet.type === 'ok' && fleet.data
  );

  const currentUnixTimestamp = Date.now() / 1000 | 0;


  for (const fleet of fleets) {
    const secondsUntilWarpable = fleet.data.warpCooldownExpiresAt.toNumber() - currentUnixTimestamp;

    if (secondsUntilWarpable > 0)
      console.log(`Fleet ${fleet.key.toBase58()} can warp again in ${secondsUntilWarpable} seconds`);
    else 
      console.log(`Fleet ${fleet.key.toBase58()} warp engines are ready to use`);
  }
}
```

**Build Dynamic Transaction:**

```typescript
import { Connection, Finality, TransactionSignature } from '@solana/web3.js';
import {
  AsyncSigner,
  buildDynamicTransactions,
  InstructionReturn,
  sendTransaction,
} from '@staratlas/data-source';

export async function sendDynamicTransaction(
  instructions: InstructionReturn[],
  signer: AsyncSigner,
  connection: Connection,
  commitment: Finality = 'confirmed'
): Promise<TransactionSignature> {
  const txs = await buildDynamicTransactions(instructions, signer, {
    connection,
  });

  if (txs.isErr()) {
    throw txs.error;
  }

  let txSignature: TransactionSignature;

  for (const tx of txs.value) {
    const result = await sendTransaction(tx, connection, {
      commitment,
      sendOptions: {
        skipPreflight: false,
      },
    });

    if (result.value.isErr()) {
      throw result.value.error;
    }

    txSignature = result.value.value;
  }

  return txSignature;
}
```
