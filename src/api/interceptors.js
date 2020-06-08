// export default fetch = (originalFetch => {
//     return (arguments) => {
//         console.info('Request API Interceptor:::', arguments);
//         const result = originalFetch.apply(this, [...arguments]);
//         return result.then(
//             console.log('Request was sent')
//         );
//     };
//   })(fetch);

export default (function () {
    var originalFetch = fetch;
    fetch = function() {
        return originalFetch.apply(this, arguments).then(function(data) {
            // someFunctionToDoSomething();
            console.info('Request API Interceptor:::', arguments);
            console.log('Request was sent');
            return data;
        });
    };
})();
  