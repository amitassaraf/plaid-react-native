import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {PropTypes} from 'prop-types';
import omit from 'object.omit';

const plaidInjectedJavaScript = `(function() {
  window.postMessage = function(data) {
    window.ReactNativeWebView.postMessage(data);
  };
})()`;

const PlaidLink = (props) => {
    const {
        publicKey,
        selectAccount,
        env,
        product,
        clientName,
        webhook,
        token,
        countryCodes,
        user,
        injectedJavaScript
    } = props;

    let uri = `https://cdn.plaid.com/link/v2/stable/link.html?key=${
        publicKey
        }&apiVersion=v2&env=${env}&product=${product}&clientName=${
        clientName
        }&isWebView=true&isMobile=true&selectAccount=${
        selectAccount
        }`;

    uri = token !== undefined ? `${uri}&token=${token}` : uri;
    uri = webhook !== undefined ? `${uri}&webhook=${webhook}` : uri;
    uri = countryCodes !== undefined ? `${uri}&countryCodes=${countryCodes}` : uri;
    uri = user !== undefined ? `${uri}&user=${encodeURI(JSON.stringify(user))}` : uri;

    const onMessage = e => {
        props.onMessage(JSON.parse(e.nativeEvent.data));
    };

    return <WebView
        {...omit(props, [
            'publicKey',
            'selectAccount',
            'env',
            'product',
            'clientName',
            'countryCodes',
            'webhook',
            'token',
            'ref',
            'injectedJavaScript'
        ])}
        ref={props.plaidRef}
        source={{uri}}
        onMessage={onMessage}
        useWebKit
        injectedJavaScript={injectedJavaScript !== undefined ? `(function() {
  window.postMessage = function(data) {
    window.ReactNativeWebView.postMessage(data);
  };
  
  ${injectedJavaScript}
})()` : plaidInjectedJavaScript}
    />;
};

PlaidLink.propTypes = {
    publicKey: PropTypes.string.isRequired,
    onMessage: PropTypes.func.isRequired,
    env: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    clientName: PropTypes.string,
    webhook: PropTypes.string,
    plaidRef: PropTypes.func,
    countryCodes: PropTypes.string
};

PlaidLink.defaultProps = {
    clientName: '',
    plaidRef: () => {
    }
};

export default PlaidLink;
