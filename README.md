### Plaid Link for React Native

![plaid_react_native](https://user-images.githubusercontent.com/2805320/29003828-ad4ab974-7ac6-11e7-90f9-e7b637b58de1.gif)

### Usage

```
yarn add plaid-react-native
yarn link react-native-webview
```

#### API

| Prop                                                                       | Type       | defaultValue            |
| -------------------------------------------------------------------------- | ---------- | ----------------------- |
| **publicKey** (required)                                                   | `string`   |                         |
| **onMessage** (required)                                                   | `function` |                         |
| **env** (required)                                                         | `string`   |                         |
| **product** (required)                                                     | `string`   |                         |
| clientName                                                                 | `string`   |                         |
| selectAccount                                                              | `boolean`  | false                   |
| webhook                                                                    | `string`   |                         |
| countryCodes                                                               | `string`   |                         |
| user                                                                       | `object`   |{legalName, emailAddress}|
| [WebView props][WebViewPropsRef]                                           | -          | -                       |

[WebViewPropsRef]: https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md#props-index

```js
render() {
  return <PlaidLink
    env="sandbox"
    onMessage={this.onMessage}
    product="auth,transactions"
    clientName="Amit Assaraf"
    publicKey="YOUR_PLAID_PUBLIC_KEY"
    selectAccount={false}
  />
}

onMessage = (plaidEventData) => {
  this.setState({plaidEventData})
}
```

##### **plaidEventData** object

```json
{
  "action": "plaid_link-undefined::connected",
  "metadata": {
    "account": {
      "id": null,
      "name": null
    },
    "account_id": null,
    "public_token": "public-sandbox-f123166-541-9865-124a-54920362faac",
    "institution": {
      "name": "Bank of America",
      "institution_id": "ins_4"
    }
  }
}
```

For more information please
[read their docs](https://plaid.com/docs/quickstart/#accessing-item-data)

[Type of actions](https://plaid.com/docs/api/#onexit-callback):

| Status                | Description                                                                                                                 |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| connected             | User completed the Link flow                                                                                                |
| requires_questions    | User prompted to answer security question(s)                                                                                |
| requires_selections   | User prompted to answer multiple choice question(s)                                                                         |
| requires_code         | User prompted to provide a one-time passcode                                                                                |
| choose_device         | User prompted to select a device on which to receive a one-time passcode                                                    |
| requires_credentials  | User prompted to provide credentials for the selected financial institution or has not yet selected a financial institution |
| institution_not_found | User exited the Link flow after unsuccessfully (no results returned) searching for a financial institution                  |

For `Sandbox mode` the credentials are:

```
username: user_good
password: pass_good
```

customise account further:

```
const SERIALIZED_OBJ = JSON.stringify({
                                      override_accounts: [{
                                          starting_balance: 60000,
                                          type: 'depository',
                                          subtype: 'savings',
                                      }, {starting_balance: 60000, type: 'depository', subtype: 'checking'}]
                                  });

username: user_custom
password: SERIALIZED_OBJ
```

#### Get your plaid API key

* Go to [Plaid dashboard](https://dashboard.plaid.com/signin) and `Sign in`.
  ![image](https://user-images.githubusercontent.com/2805320/29003405-274c972c-7abf-11e7-89f5-dffce0d0132a.png)
* Add Plaid to your app
  ![image](https://user-images.githubusercontent.com/2805320/29003409-36d48042-7abf-11e7-8e55-01a1e184fb49.png)
* Copy your Plaid **public_key**

#### Contact

Email: amit.assaraf@gmail.com
Website: amitassaraf@me.com
