// Generated by CoffeeScript 1.3.3
/*
Copyright (c) 2012 [DeftJS Framework Contributors](http://deftjs.org)
Open source under the [MIT License](http://en.wikipedia.org/wiki/MIT_License).
*/

/*
Jasmine test suite for Deft.promise.Promise
*/

describe('Deft.promise.Promise', function() {
  beforeEach(function() {
    this.addMatchers({
      toBeInstanceOf: function(className) {
        return this.actual instanceof Ext.ClassManager.get(className);
      }
    });
  });
  describe('when()', function() {
    var MockThirdPartyPromise, cancelCallback, deferred, failureCallback, progressCallback, successCallback;
    deferred = null;
    successCallback = failureCallback = progressCallback = cancelCallback = null;
    MockThirdPartyPromise = (function() {

      function MockThirdPartyPromise() {}

      MockThirdPartyPromise.prototype.then = function(successCallback, failureCallback) {
        this.successCallback = successCallback;
        this.failureCallback = failureCallback;
        switch (this.state) {
          case 'resolved':
            this.successCallback(this.value);
            break;
          case 'rejected':
            this.failureCallback(this.value);
        }
      };

      MockThirdPartyPromise.prototype.resolve = function(value) {
        this.value = value;
        this.state = 'resolved';
        if (this.successCallback != null) {
          this.successCallback(this.value);
        }
      };

      MockThirdPartyPromise.prototype.reject = function(value) {
        this.value = value;
        this.state = 'rejected';
        if (this.failureCallback != null) {
          this.failureCallback(this.value);
        }
      };

      return MockThirdPartyPromise;

    })();
    beforeEach(function() {
      deferred = Ext.create('Deft.promise.Deferred');
      successCallback = jasmine.createSpy('success callback');
      failureCallback = jasmine.createSpy('failure callback');
      progressCallback = jasmine.createSpy('progress callback');
      cancelCallback = jasmine.createSpy('cancel callback');
    });
    it('should return an immediately resolved Promise when a value specified', function() {
      var promise;
      promise = Deft.promise.Promise.when('expected value');
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise.getState()).toBe('resolved');
      expect(successCallback).toHaveBeenCalledWith('expected value');
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    it('should return a new resolved Promise when a resolved Promise is specified', function() {
      var promise;
      deferred.resolve('expected value');
      promise = Deft.promise.Promise.when(deferred.getPromise());
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise).not.toBe(deferred.getPromise());
      expect(promise.getState()).toBe('resolved');
      expect(successCallback).toHaveBeenCalledWith('expected value');
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    it('should return a new rejected Promise when a rejected Promise is specified', function() {
      var promise;
      deferred.reject('error message');
      promise = Deft.promise.Promise.when(deferred.getPromise());
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise).not.toBe(deferred.getPromise());
      expect(promise.getState()).toBe('rejected');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).toHaveBeenCalledWith('error message');
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    it('should return a new pending (and immediately updated) Promise when a pending (and updated) Promise is specified', function() {
      var promise;
      deferred.update('progress');
      promise = Deft.promise.Promise.when(deferred.getPromise());
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise).not.toBe(deferred.getPromise());
      expect(promise.getState()).toBe('pending');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).toHaveBeenCalledWith('progress');
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    it('should return a new cancelled Promise when a cancelled Promise specified', function() {
      var promise;
      deferred.cancel('reason');
      promise = Deft.promise.Promise.when(deferred.getPromise());
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise).not.toBe(deferred.getPromise());
      expect(promise.getState()).toBe('cancelled');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).toHaveBeenCalledWith('reason');
    });
    it('should return a new pending Promise that resolves when the pending Promise specified is resolved', function() {
      var promise;
      promise = Deft.promise.Promise.when(deferred.getPromise());
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise).not.toBe(deferred.getPromise());
      expect(promise.getState()).toBe('pending');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      expect(cancelCallback).not.toHaveBeenCalled();
      deferred.resolve('expected value');
      expect(promise.getState()).toBe('resolved');
      expect(successCallback).toHaveBeenCalledWith('expected value');
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    it('should return a new pending Promise that rejects when the pending Promise specified is rejected', function() {
      var promise;
      promise = Deft.promise.Promise.when(deferred.getPromise());
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise).not.toBe(deferred.getPromise());
      expect(promise.getState()).toBe('pending');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      expect(cancelCallback).not.toHaveBeenCalled();
      deferred.reject('error message');
      expect(promise.getState()).toBe('rejected');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).toHaveBeenCalledWith('error message');
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    it('should return a new pending Promise that updates when the pending Promise specified is updated', function() {
      var promise;
      promise = Deft.promise.Promise.when(deferred.getPromise());
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise).not.toBe(deferred.getPromise());
      expect(promise.getState()).toBe('pending');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      expect(cancelCallback).not.toHaveBeenCalled();
      deferred.update('progress');
      expect(promise.getState()).toBe('pending');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).toHaveBeenCalledWith('progress');
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    it('should return a new pending Promise that cancels when the pending Promise specified is cancelled', function() {
      var promise;
      promise = Deft.promise.Promise.when(deferred.getPromise());
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise).not.toBe(deferred.getPromise());
      expect(promise.getState()).toBe('pending');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      expect(cancelCallback).not.toHaveBeenCalled();
      deferred.cancel('reason');
      expect(promise.getState()).toBe('cancelled');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).toHaveBeenCalledWith('reason');
    });
    it('should return a new resolved Promise when a resolved untrusted Promise is specified', function() {
      var mockThirdPartyPromise, promise;
      mockThirdPartyPromise = new MockThirdPartyPromise();
      mockThirdPartyPromise.resolve('expected value');
      promise = Deft.promise.Promise.when(mockThirdPartyPromise);
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise).not.toBe(mockThirdPartyPromise);
      expect(promise.getState()).toBe('resolved');
      expect(successCallback).toHaveBeenCalledWith('expected value');
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    it('should return a new rejected Promise when a rejected untrusted Promise is specified', function() {
      var mockThirdPartyPromise, promise;
      mockThirdPartyPromise = new MockThirdPartyPromise();
      mockThirdPartyPromise.reject('error message');
      promise = Deft.promise.Promise.when(mockThirdPartyPromise);
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise).not.toBe(mockThirdPartyPromise);
      expect(promise.getState()).toBe('rejected');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).toHaveBeenCalledWith('error message');
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    it('should return a new Promise that resolves when the specified untrusted Promise is resolved', function() {
      var mockThirdPartyPromise, promise;
      mockThirdPartyPromise = new MockThirdPartyPromise();
      promise = Deft.promise.Promise.when(mockThirdPartyPromise);
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise).not.toBe(mockThirdPartyPromise);
      expect(promise.getState()).toBe('pending');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      expect(cancelCallback).not.toHaveBeenCalled();
      mockThirdPartyPromise.resolve('expected value');
      expect(promise.getState()).toBe('resolved');
      expect(successCallback).toHaveBeenCalledWith('expected value');
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    return it('should return a new Promise that rejects when the specified untrusted Promise is rejected', function() {
      var mockThirdPartyPromise, promise;
      mockThirdPartyPromise = new MockThirdPartyPromise();
      promise = Deft.promise.Promise.when(mockThirdPartyPromise);
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise).not.toBe(mockThirdPartyPromise);
      expect(promise.getState()).toBe('pending');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      expect(cancelCallback).not.toHaveBeenCalled();
      mockThirdPartyPromise.reject('error message');
      expect(promise.getState()).toBe('rejected');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).toHaveBeenCalledWith('error message');
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
  });
  describe('all()', function() {
    var cancelCallback, failureCallback, progressCallback, successCallback;
    successCallback = failureCallback = progressCallback = cancelCallback = null;
    beforeEach(function() {
      successCallback = jasmine.createSpy('success callback');
      failureCallback = jasmine.createSpy('failure callback');
      progressCallback = jasmine.createSpy('progress callback');
      cancelCallback = jasmine.createSpy('cancel callback');
    });
    it('should return an immediately resolved Promise when an Array containing a single value is specified', function() {
      var promise;
      promise = Deft.promise.Promise.all(['expected value']).then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise.getState()).toBe('resolved');
      expect(successCallback).toHaveBeenCalledWith(['expected value']);
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    it('should return a resolved Promise when an Array containing a single resolved Promise is specified', function() {
      var deferred, promise;
      deferred = Ext.create('Deft.promise.Deferred');
      deferred.resolve('expected value');
      promise = Deft.promise.Promise.all([deferred]).then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise.getState()).toBe('resolved');
      expect(successCallback).toHaveBeenCalledWith(['expected value']);
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    it('should return a rejected Promise completed with the originating error when an Array containing a single rejected Promise is specified', function() {
      var deferred, promise;
      deferred = Ext.create('Deft.promise.Deferred');
      deferred.reject('error message');
      promise = Deft.promise.Promise.all([deferred]);
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise.getState()).toBe('rejected');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).toHaveBeenCalledWith('error message');
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    it('should return a pending (and immediately updated) Promise when an Array containing a single pending (and updated) Promise is specified', function() {
      var deferred, promise;
      deferred = Ext.create('Deft.promise.Deferred');
      deferred.update('progress');
      promise = Deft.promise.Promise.all([deferred]);
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise.getState()).toBe('pending');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).toHaveBeenCalledWith('progress');
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    it('should return a cancelled Promise completed with the originating reason when an Array containing a single cancelled Promise is specified', function() {
      var deferred, promise;
      deferred = Ext.create('Deft.promise.Deferred');
      deferred.cancel('reason');
      promise = Deft.promise.Promise.all([deferred]);
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise.getState()).toBe('cancelled');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).toHaveBeenCalledWith('reason');
    });
    it('should return a Promise that resolves when an Array containing a single Promise is specified and that single Promise is resolved', function() {
      var deferred, promise;
      deferred = Ext.create('Deft.promise.Deferred');
      promise = Deft.promise.Promise.all([deferred]);
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise.getState()).toBe('pending');
      deferred.resolve('expected value');
      expect(promise.getState()).toBe('resolved');
      expect(successCallback).toHaveBeenCalledWith(['expected value']);
      expect(failureCallback).not.toHaveBeenCalled();
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
    return it('should return a Promise that rejects when an Array containing a single Promise is specified and that single Promise is rejected', function() {
      var deferred, promise;
      deferred = Ext.create('Deft.promise.Deferred');
      promise = Deft.promise.Promise.all([deferred]);
      promise.then({
        success: successCallback,
        failure: failureCallback,
        progress: progressCallback,
        cancel: cancelCallback
      });
      expect(promise).toBeInstanceOf('Deft.promise.Promise');
      expect(promise.getState()).toBe('pending');
      deferred.reject('error message');
      expect(promise.getState()).toBe('rejected');
      expect(successCallback).not.toHaveBeenCalled();
      expect(failureCallback).toHaveBeenCalledWith('error message');
      expect(progressCallback).not.toHaveBeenCalled();
      return expect(cancelCallback).not.toHaveBeenCalled();
    });
  });
  describe('any()', function() {
    var cancelCallback, failureCallback, progressCallback, successCallback;
    successCallback = failureCallback = progressCallback = cancelCallback = null;
    return beforeEach(function() {
      successCallback = jasmine.createSpy('success callback');
      failureCallback = jasmine.createSpy('failure callback');
      progressCallback = jasmine.createSpy('progress callback');
      cancelCallback = jasmine.createSpy('cancel callback');
    });
  });
  describe('memoize()', function() {
    var cancelCallback, failureCallback, progressCallback, successCallback;
    successCallback = failureCallback = progressCallback = cancelCallback = null;
    return beforeEach(function() {
      successCallback = jasmine.createSpy('success callback');
      failureCallback = jasmine.createSpy('failure callback');
      progressCallback = jasmine.createSpy('progress callback');
      cancelCallback = jasmine.createSpy('cancel callback');
    });
  });
  describe('map()', function() {
    var cancelCallback, failureCallback, progressCallback, successCallback;
    successCallback = failureCallback = progressCallback = cancelCallback = null;
    return beforeEach(function() {
      successCallback = jasmine.createSpy('success callback');
      failureCallback = jasmine.createSpy('failure callback');
      progressCallback = jasmine.createSpy('progress callback');
      cancelCallback = jasmine.createSpy('cancel callback');
    });
  });
  describe('reduce()', function() {
    var cancelCallback, failureCallback, progressCallback, successCallback;
    successCallback = failureCallback = progressCallback = cancelCallback = null;
    return beforeEach(function() {
      successCallback = jasmine.createSpy('success callback');
      failureCallback = jasmine.createSpy('failure callback');
      progressCallback = jasmine.createSpy('progress callback');
      cancelCallback = jasmine.createSpy('cancel callback');
    });
  });
  describe('then()', function() {
    var cancelCallback, failureCallback, progressCallback, successCallback;
    successCallback = failureCallback = progressCallback = cancelCallback = null;
    return beforeEach(function() {
      successCallback = jasmine.createSpy('success callback');
      failureCallback = jasmine.createSpy('failure callback');
      progressCallback = jasmine.createSpy('progress callback');
      cancelCallback = jasmine.createSpy('cancel callback');
    });
  });
  describe('otherwise()', function() {
    var cancelCallback, failureCallback, progressCallback, successCallback;
    successCallback = failureCallback = progressCallback = cancelCallback = null;
    return beforeEach(function() {
      successCallback = jasmine.createSpy('success callback');
      failureCallback = jasmine.createSpy('failure callback');
      progressCallback = jasmine.createSpy('progress callback');
      cancelCallback = jasmine.createSpy('cancel callback');
    });
  });
  describe('always()', function() {
    var cancelCallback, failureCallback, progressCallback, successCallback;
    successCallback = failureCallback = progressCallback = cancelCallback = null;
    return beforeEach(function() {
      successCallback = jasmine.createSpy('success callback');
      failureCallback = jasmine.createSpy('failure callback');
      progressCallback = jasmine.createSpy('progress callback');
      cancelCallback = jasmine.createSpy('cancel callback');
    });
  });
  return describe('cancel()', function() {
    var cancelCallback, failureCallback, progressCallback, successCallback;
    successCallback = failureCallback = progressCallback = cancelCallback = null;
    return beforeEach(function() {
      successCallback = jasmine.createSpy('success callback');
      failureCallback = jasmine.createSpy('failure callback');
      progressCallback = jasmine.createSpy('progress callback');
      cancelCallback = jasmine.createSpy('cancel callback');
    });
  });
});
