// preload.cjs - MUST be loaded via --require flag BEFORE any other module
// Patches process.stdin getter to safely handle EEXIST on Hostinger daemon
// where file descriptor 0 (stdin) is in an invalid/closed state.
'use strict';

try {
  const originalDescriptor = Object.getOwnPropertyDescriptor(process, 'stdin');

  if (originalDescriptor && typeof originalDescriptor.get === 'function') {
    let cachedStdin = null;

    Object.defineProperty(process, 'stdin', {
      get: function () {
        if (cachedStdin) return cachedStdin;
        try {
          cachedStdin = originalDescriptor.get.call(process);
          return cachedStdin;
        } catch (e) {
          // On Hostinger daemon, fd 0 (stdin) is unavailable - return a safe null stream
          const { Readable } = require('stream');
          cachedStdin = new Readable({ read() {} });
          cachedStdin.push(null); // mark as ended
          return cachedStdin;
        }
      },
      set: function (val) { cachedStdin = val; },
      configurable: true,
      enumerable: true,
    });
  }
} catch (e) {
  // Patching failed - log and continue, better than crashing
  console.warn('[preload] Could not patch process.stdin:', e.message);
}
