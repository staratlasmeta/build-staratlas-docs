# How To Use F-Kit Blueprints

### Create Wallet flow

The flow to create a new wallet is pretty straight forward

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2Fs5hMRxvKDyr2WI0Mxoim%2FScreen%20Shot%202022-10-28%20at%202.06.09%20PM.png?alt=media&#x26;token=953c7e5e-464a-49f6-87ee-ab52c65ce6f1" alt=""><figcaption></figcaption></figure>

It is enough to call the “[*CreateNewWallet*](https://www.notion.so/SolanaWallet-a8095ce998a149d088788c4ebecfcb6f)” function from the SolanaWalletManager.

From the returned Wallet object it is mandatory to set a new password: this can be done with the “[*SetPassword*](https://www.notion.so/SolanaWallet-a8095ce998a149d088788c4ebecfcb6f)” function.

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2FIkivew6QgRGe8tg2xFAP%2FScreen%20Shot%202022-10-28%20at%202.11.29%20PM.png?alt=media&#x26;token=ee6150ef-3178-4f52-b985-a58e9130037d" alt=""><figcaption></figcaption></figure>

Then it is mandatory to generate a Mnemonic for the given Wallet. This can be done with the “[*GenerateMnemonic*](https://www.notion.so/SolanaWallet-a8095ce998a149d088788c4ebecfcb6f)” function. The Sting returned is the “SeedPhrase” that can be used to restore the wallet.

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2FsMPjQzTvf7vkHqm50J7X%2FScreen%20Shot%202022-10-28%20at%202.12.08%20PM.png?alt=media&#x26;token=14033dbf-8af1-47f9-9774-cb3471df4696" alt=""><figcaption></figcaption></figure>

The new Wallet needs at least an account. An account can be generated with the “*GenerateNewAccount*” function.

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2FatC2TBYdYiAZTRWAztAz%2FScreen%20Shot%202022-10-28%20at%202.12.25%20PM.png?alt=media&#x26;token=9aaa62d7-a7af-43ba-b31a-9c06231ba410" alt=""><figcaption></figcaption></figure>

Finally, the created wallet can be saved to the local system. This is done with the “*SetSaveSlotName*” and “*SaveWallet*” functions. The SaveSlotName parameter is suggested to be a combination of the wallet name and the public key of the wallet.

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2Fz8WTIa0xzVnBgtvsz0CD%2FScreen%20Shot%202022-10-28%20at%202.12.43%20PM.png?alt=media&#x26;token=b741f337-6e0a-4765-8327-b2a1b690dd1c" alt=""><figcaption></figcaption></figure>

### Recover Wallet flow

A wallet can be recovered both with “PrivateKey” or “SeedPhrase”.

In order to restore a wallet you need to create a new Wallet object as shown in the first step of the “Create Wallet Flow”.

### Restore from seed phrase

From the created Wallet object, you need to restore the Mnemonic

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2FCwG1KA0wV4KUYFsLXdcz%2FScreen%20Shot%202022-10-28%20at%202.13.05%20PM.png?alt=media&#x26;token=62e2c2ed-b381-420c-95e5-5fb7ded7d742" alt=""><figcaption></figcaption></figure>

Then, in order to retrieve the accounts, a derivation path must be selected

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2FlKw891e3s1poWPoK48wS%2FScreen%20Shot%202022-10-28%20at%202.13.23%20PM.png?alt=media&#x26;token=c0aaa1a3-ec41-47f5-b4ad-4fbf8acd4a09" alt=""><figcaption></figcaption></figure>

Then it is needed to set a new password for the wallet and save it as seen in the “Create Wallet” flow.

### Restore from private key

From the created wallet object, it is enough to call the “*ImportAccountFromPrivateKey*”

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2FWBOSUwyCT98saOTqyuJJ%2FScreen%20Shot%202022-10-28%20at%202.13.40%20PM.png?alt=media&#x26;token=e8c0ec95-e38c-4b7a-8b09-b0ddf8897bfa" alt=""><figcaption></figcaption></figure>

Then it is needed to set a new password for the wallet and save it as seen in the “Create Wallet” flow.

## Unlock an existing wallet

In order to login to an existing wallet it is enought to retrieve the existing wallet from a “SaveSlotName” using the “*GetOrCreateWallet*” and then calll the “*UnlockWallet*” function providing the correct password.

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2F37EIfrxSXqGDSspksdkr%2FScreen%20Shot%202022-10-28%20at%202.14.02%20PM.png?alt=media&#x26;token=0019f898-0c76-4743-a199-bf8a00dfe27c" alt=""><figcaption></figcaption></figure>

<figure><img src="https://1689566151-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fr7ZiGN2LM1O6jHUxXhof%2Fuploads%2FFcWsRT9m0UrZGjCBfkkR%2FScreen%20Shot%202022-10-28%20at%202.14.14%20PM.png?alt=media&#x26;token=0a345c69-25a1-4202-a3f6-a28dd0ad5d7a" alt=""><figcaption></figcaption></figure>
