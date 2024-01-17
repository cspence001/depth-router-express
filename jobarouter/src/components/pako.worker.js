// Worker thread (worker.js)
function initializeWorker() {  

  const loopworker = () => {
  if( 'function' === typeof importScripts) {
    /* eslint-disable-next-line no-undef */
    importScripts('https://cdn.jsdelivr.net/npm/pako@2.0.3/dist/pako.min.js');
  }
    /* eslint-disable-next-line no-restricted-globals */
    const pako = self.pako;
    onmessage = (event) => {
        if (event.data) {
        const { action, data } = event.data;
        try {
          if (action === 'compress') {
            const compressedData = pako.deflate(JSON.stringify(data), { to: 'string' });
            postMessage(compressedData);
          } else if (action === 'decompress') {
            const decompressedData = JSON.parse(pako.inflate(data, { to: 'string' }));
            postMessage(decompressedData);
          } else {
            throw new Error('Invalid action provided');
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  let code = loopworker.toString()
  code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"))
  const blob = new Blob([code], { type: 'application/javascript' })
  const workerScript = URL.createObjectURL(blob)
  return workerScript;
  }
export default initializeWorker();