/*eslint-env es6, browser */
import 'whatwg-fetch';

export class MessageHandler {
  send(uri, opts) { // eslint-disable-line no-unused-vars
    throw new Error('MessageHandler.handle must be implemented');
  }
}

export class DefaultMessageHandler {
  send(uri, opts) {
    return fetch(uri, opts).then(result => {
      if (result.status >= 200 && result.status < 300) return result;
      
      var e = new Error('Request failed');
      e.result = result;
      
      throw e;
    });
  }
}

export class DelegatingMessageHandler extends MessageHandler {
  constructor(next) {
    super();
    this.next = next;
  }

  send(uri, opts) {
    return this.next(uri, opts);
  }
}

export class SimpleClient extends MessageHandler {
  constructor(handler = new DefaultMessageHandler()) {
    super();
    this.handler = handler;

    // TODO: Add default values to stuff like common headers etc.
  }

  send(uri, opts = {}) {
    // TODO: Apply default values for headers and base URI etc.

    return this.handler.send(uri, opts);
  }

  /**
   * Sends an HTTP DELETE request.
   *
   * @method delete
   * @param {String} uri The target URI.
   * @param {Object} opts Request options
   * @return {Promise} A promise.
   */
  delete(uri, opts = {}) {
    return this.send(uri, Object.assign({}, opts, {method: 'delete'}));
  }

  /**
   * Sends an HTTP GET request.
   *
   * @method get
   * @param {String} uri The target URI.
   * @param {Object} opts Request options
   * @return {Promise} A promise.
   */
  get(uri, opts = {}) {
    return this.send(uri, Object.assign({}, opts, {method: 'get'}));
  }

   /**
   * Sends an HTTP HEAD request.
   *
   * @method head
   * @param {String} uri The target URI.
   * @param {Object} opts Request options
   * @return {Promise} A promise.
   */
  head(uri, opts = {}) {
    return this.send(uri, Object.assign({}, opts, {method: 'head'}));
  }

   /**
   * Sends an HTTP OPTIONS request.
   *
   * @method options
   * @param {String} uri The target URI.
   * @param {Object} opts Request options
   * @return {Promise} A promise.
   */
  options(uri, opts = {}) {
    return this.send(uri, Object.assign({}, opts, {method: 'options'}));
  }

   /**
   * Sends an HTTP PUT request.
   *
   * @method put
   * @param {String} uri The target URI.
   * @param {Object} opts Request put
   * @return {Promise} A promise.
   */
  put(uri, opts = {}) {
    return this.send(uri, Object.assign({}, opts, {method: 'put'}));
  }

   /**
   * Sends an HTTP PATCH request.
   *
   * @method patch
   * @param {String} uri The target URI.
   * @param {Object} opts Request patch
   * @return {Promise} A promise.
   */
  patch(uri, opts = {}) {
    return this.send(uri, Object.assign({}, opts, {method: 'patch'}));
  }

   /**
   * Sends an HTTP POST request.
   *
   * @method post
   * @param {String} uri The target URI.
   * @param {Object} opts Request post
   * @return {Promise} A promise.
   */
  post(uri, opts = {}) {
    return this.send(uri, Object.assign({}, opts, {method: 'post'}));
  }
}