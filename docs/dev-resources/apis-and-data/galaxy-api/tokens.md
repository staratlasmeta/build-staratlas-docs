# Tokens

## Circulating token supply information

<mark style="color:blue;">`GET`</mark> `https://galaxy.staratlas.com/tokens/:token`

#### Path Parameters

| Name                                     | Type   | Description           |
| ---------------------------------------- | ------ | --------------------- |
| :token<mark style="color:red;">\*</mark> | String | Options: atlas, polis |


#### 200: OK 


```javascript
{
  "symbol": "ATLAS",
  "mint": "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx",
  "totalSupply": 36000000000,
  "circulating": 7261703535.9892,
  "circulatingPercentage": 0.201714
}
```
