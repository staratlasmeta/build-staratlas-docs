# F-Kit - Documentation

## **SolanaWallet**

**USolanaWallet Class Reference**

`#include <`` `**`SolanaWallet.h`**` ``>`&#x20;

**Public Member Functions**

<table><thead><tr><th width="196">Type</th><th>Function</th></tr></thead><tbody><tr><td>void</td><td><strong>SetSaveSlotName</strong> (FString NewSaveSlotName)</td></tr><tr><td>const FString &#x26;</td><td><strong>GetSaveSlotName</strong> () const</td></tr><tr><td>bool</td><td><strong>DoesWalletExist</strong> () const</td></tr><tr><td>bool</td><td><strong>GenerateMnemonic</strong> (FString &#x26;MnemonicString)</td></tr><tr><td>bool</td><td><strong>RestoreMnemonic</strong> (FString InMnemonic)</td></tr><tr><td>FString</td><td><strong>GetMnemonicString</strong> () const</td></tr><tr><td> </td><td><strong>DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam</strong> (FOnMnemonicUpdated, FString, Mnemonic)</td></tr><tr><td>bool</td><td><strong>SetPassword</strong> (FString NewPassword)</td></tr><tr><td>bool</td><td><strong>SaveWallet</strong> ()</td></tr><tr><td>bool</td><td><strong>UnlockWallet</strong> (FString Password)</td></tr><tr><td>void</td><td><strong>LockWallet</strong> (bool bSaveWallet)</td></tr><tr><td>void</td><td><strong>WipeWallet</strong> ()</td></tr><tr><td> </td><td><p><strong>DECLARE_DYNAMIC_MULTICAST_DELEGATE_OneParam</strong> (FOnWalletWiped, <strong>USolanaWallet</strong> *,</p><p>Wallet)</p></td></tr><tr><td>bool</td><td><strong>IsWalletLocked</strong> () const</td></tr><tr><td>bool</td><td><strong>SetDerivationPath</strong> (const <strong>FDerivationPath</strong> &#x26;DerivationPath)</td></tr><tr><td>bool</td><td><strong>GetAccountsFromPath</strong> (<strong>FDerivationPath</strong> Path, int32 NumAccounts, TArray&#x3C; FAccount > &#x26;OutAccounts) const</td></tr><tr><td><strong>UWalletAccount</strong> *</td><td><strong>GetAccountFromGenIndex</strong> (int32 GenIndex) const</td></tr><tr><td><strong>UWalletAccount</strong> *</td><td><strong>GenerateAccountFromGenIndex</strong> (int32 GenIndex)</td></tr><tr><td>uint32</td><td><strong>GetNextAccountIndexToGenerate</strong> () const</td></tr><tr><td><strong>UWalletAccount</strong> *</td><td><strong>GenerateNewAccount</strong> ()</td></tr><tr><td><strong>UWalletAccount</strong> *</td><td><strong>ImportAccountFromPrivateKey</strong> (FString PrivateKey)</td></tr><tr><td><strong>UWalletAccount</strong> *</td><td><strong>ImportAccountFromPublicKey</strong> (FString PublicKey)</td></tr><tr><td>void</td><td><strong>RemoveAccount</strong> (<strong>UWalletAccount</strong> *Account)</td></tr><tr><td>TArray&#x3C; <strong>UWalletAccount</strong> * ></td><td><strong>GetAccounts</strong> () const</td></tr></tbody></table>

**Static Public Member Functions**

<table><thead><tr><th width="302">Type</th><th>Function</th></tr></thead><tbody><tr><td>static bool</td><td><strong>IsMnemonicValid</strong> (FString Mnemonic)</td></tr><tr><td>static TArray&#x3C; <strong>FDerivationPath</strong> ></td><td><strong>GetDerivationPaths</strong> ()</td></tr><tr><td>static void</td><td><strong>ClipboardCopy</strong> (FString String)</td></tr></tbody></table>

**Public Attributes**

| FOnMnemonicUpdatedFOnMnemonicUpdated | **OnMnemonicUpdatedOnMnemonicUpdated** |
| ------------------------------------ | -------------------------------------- |
| FOnWalletWiped                       | **OnWalletWiped**                      |

## Detailed Description

**USolanaWallet**

This class abstracts a wallet for the Solana network and it is made up of:

* a mnemonic phrase to generate new accounts
* a derivation path to generate new accounts&#x20;
* a save slot name to save the wallet on disk&#x20;
* a password to encrypt the wallet on disk&#x20;
* a list of accounts either generated from the mnemonic phrase or imported from a public or private key

## Member Function Documentation&#x20;

### ClipboardCopy()

**static void USolanaWallet::ClipboardCopy(FString&#x20;*****String*****)static**&#x20;

Copy the string parameter to the system clipboard.

**Parameters:**&#x20;

* Strin&#x67;**:** The string to copy.

### DECLARE\_DYNAMIC\_MULTICAST\_DELEGATE\_OneParam() \[1/2]

**USolanaWallet::DECLARE\_DYNAMIC\_MULTICAST\_DELEGATE\_OneParam(FOnMnemonicUpdated ,FString ,Mnemonic  )**&#x20;

Called when mnemonic is set, loaded or erased.&#x20;

**Parameters:**&#x20;

* Mnemonic: The Updated Mnemonic

### DECLARE\_DYNAMIC\_MULTICAST\_DELEGATE\_OneParam() \[2/2]

**USolanaWallet::DECLARE\_DYNAMIC\_MULTICAST\_DELEGATE\_OneParam(FOnWalletWiped ,USolanaWallet \* ,Wallet  )**&#x20;

Called when the wallet get wiped&#x20;

**Parameters:**

* Wallet: The wiped wallet

### DoesWalletExist()

**bool USolanaWallet::DoesWalletExist()const**

Check if there is an existing file for this wallet.

**Returns:**

* Whether the wallet file already exists or not.

### GenerateAccountFromGenIndex()

**UWalletAccount \* USolanaWallet::GenerateAccountFromGenIndex(int32&#x20;*****GenIndex*****)**&#x20;

Generate an account with the given generation index

**Parameters:**

* GenIndex: The generation index

**Returns:**

* The generated **UWalletAccount**.

### GenerateMnemonic()

**bool USolanaWallet::GenerateMnemonic(FString &&#x20;*****MnemonicString*****)**&#x20;

Generate a mnemonic if no mnemonic exists in this wallet

**Parameters:**

* MnemonicString: the mnemonic string currently in use.

**Returns:**

* Whether the mnemonic has been generated or not.

### GenerateNewAccount()

**UWalletAccount \* USolanaWallet::GenerateNewAccount()**&#x20;

Generate a new account increasing the generation index

**Returns:**

* The generated account

### GetAccountFromGenIndex()

**UWalletAccount \* USolanaWallet::GetAccountFromGenIndex(int32&#x20;*****GenIndex*****)const**&#x20;

Get the account corresponding to the given generation index if it has been already generated

**Parameters:**

* GenIndex: The generation index

**Returns:**

* The corresponding **UWalletAccount**

### GetAccounts()

**TArray< UWalletAccount \* > USolanaWallet::GetAccounts()const**&#x20;

Get all accounts in this wallet

**Returns:**

* The list of account for this wallet

### GetAccountsFromPath()

**bool USolanaWallet::GetAccountsFromPath(FDerivationPath&#x20;*****Path*****,int32&#x20;*****NumAccounts*****,TArray< FAccount > &&#x20;*****OutAccounts*****)const**

Get accounts for a specific derivation path

**Parameters:**&#x20;

* Pat&#x68;**:** The DerivationPath
* NumAccount&#x73;**:** The number of accounts to retrieve
* OutAccount&#x73;**:** The list of accounts&#x20;

**Returns:**

* Whether the accounts were found for the given derivation path

### GetDerivationPaths()

**static TArray< FDerivationPath > USolanaWallet::GetDerivationPaths()static**&#x20;

Get all available derivation paths

**Returns:**

* The list of available derivation paths

### GetMnemonicString()

**FString USolanaWallet::GetMnemonicString()const**&#x20;

Get the Mnemonic string of this wallet

**Returns:**

* The mnemonic of this wallet

### GetNextAccountIndexToGenerate()

**uint32 USolanaWallet::GetNextAccountIndexToGenerate()const**&#x20;

Get the index of the next account to generate

**Returns:**

* The index of the next account to generate

### GetSaveSlotName()

**const FString & USolanaWallet::GetSaveSlotName()constinline**&#x20;

Get the name of the file used to load or save this wallet

**Returns:**

* Name of the slot name file currently in use

### ImportAccountFromPrivateKey()

**UWalletAccount \* USolanaWallet::ImportAccountFromPrivateKey(FString&#x20;*****PrivateKey*****)**&#x20;

Create an account from a private key

**Parameters:**&#x20;

* PrivateKey: The private key

**Returns:**&#x20;

* The created account

### ImportAccountFromPublicKey()

**UWalletAccount \* USolanaWallet::ImportAccountFromPublicKey(FString&#x20;*****PublicKey*****)**&#x20;

Create an account from a public key

**Parameters:**

* PublicKey: The public key

**Returns:**

* The created account.

### IsMnemonicValid()

**static bool USolanaWallet::IsMnemonicValid(FString&#x20;*****Mnemonic*****)static**

Check if a Mnemonic string is valid.&#x20;

**Parameters:**

* Mnemonic: The Mnemonic to check&#x20;

**Returns:**

* Whether the mnemonic is valid or not

### IsWalletLocked()

**bool USolanaWallet::IsWalletLocked()const**&#x20;

Whether the wallet is locked or not

**Returns:**

* Whether the wallet is locked or not

### LockWallet()

**void USolanaWallet::LockWallet(bool&#x20;*****bSaveWallet*****)**&#x20;

Lock the wallet, deleting mnemonic and private keys from memory

**Returns**

* Whether the lock was successful or not

### RemoveAccount()

**void USolanaWallet::RemoveAccount(UWalletAccount \*&#x20;*****Account*****)**&#x20;

Remove an account from this wallet

**Parameters**

* Account: The account to remove

### RestoreMnemonic()

**bool USolanaWallet::RestoreMnemonic(FString&#x20;*****InMnemonic*****)**&#x20;

Restore a mnemonic if no mnemonic exists in this wallet

**Parameters:**

* InMnemonic: The new Mnemonic&#x20;

**Returns:**

* Whether the mnemonic has been restored or not

### SaveWallet()

**bool USolanaWallet::SaveWallet()**

Save this wallet to disk to reload it later

**Returns:**&#x20;

* Whether the save was successful or not

### SetDerivationPath()

**bool USolanaWallet::SetDerivationPath(const FDerivationPath &&#x20;*****DerivationPath*****)**&#x20;

Set the derivation path for this wallet to derive new wallet address

**Parameters:**

* DerivationPathThe new DerivationPath

**Returns:**

* Whether the new DerivationPath has been set or not

### SetPassword()

**bool USolanaWallet::SetPassword(FString&#x20;*****NewPassword*****)**&#x20;

Set or change the password

**Parameters**

* NewPassword: The new password

**Returns:**

* Whether the new password has been set or not

### SetSaveSlotName()

**void USolanaWallet::SetSaveSlotName(FString&#x20;*****NewSaveSlotName*****)**&#x20;

Set the name of the file used to load or save this wallet

**Parameters**

* NewSaveSlotName: Name of the slot name file to use.

### UnlockWallet()

**bool USolanaWallet::UnlockWallet(FString&#x20;*****Password*****)**&#x20;

Load and unlock this wallet from disk if password is correct

**Returns:**

* Whether the unlock was successful or not

### WipeWallet()

**void USolanaWallet::WipeWallet()**&#x20;

Wipe the wallet from both memory and disk

**Returns:**

* Whether the wipe was successful or not

&#x20;

## SolanaWalletManager

**USolanaWalletManager Class Reference**

**Public Member Functions**

| Type                 | Function                                                        |
| -------------------- | --------------------------------------------------------------- |
| virtual void         | **Initialize** (FSubsystemCollectionBase \&Collection) override |
| TArray< FString >    | **GetSaveSlotList** () const                                    |
| **USolanaWallet** \* | **CreateNewWallet** ()                                          |
| **USolanaWallet** \* | **GetOrCreateWallet** (const FString \&SlotName)                |
| void                 | **RegisterWallet** (**USolanaWallet** \*Wallet)                 |

### Member Function Documentation&#x20;

### CreateNewWallet()

**USolanaWallet \* USolanaWalletManager::CreateNewWallet()**&#x20;

Create a new wallet

**Returns:**

* The created **USolanaWallet**

### GetOrCreateWallet()

**USolanaWallet \* USolanaWalletManager::GetOrCreateWallet(const FString &&#x20;*****SlotName*****)**&#x20;

Get a wallet from a slot name, create a new one if not exists

**Parameters:**

* SlotName: The slot name

**Returns**

* The created or retrieved account

### GetSaveSlotList()

**TArray< FString > USolanaWalletManager::GetSaveSlotList()const**&#x20;

Get the list of available save slots

**Returns:**

* The array of available slots

### RegisterWallet()

**void USolanaWalletManager::RegisterWallet(USolanaWallet \*&#x20;*****Wallet*****)**&#x20;

Register a newly created wallet into the list of wallets

**Parameters:**

* Wallet: The private key
