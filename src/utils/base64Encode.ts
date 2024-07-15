const alphabet64 =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/***
 * Base 64 encode
 * @param {string} input
 *
 * @returns {string} output
 */
export const base64Encode = (input: string) => {
  let bits = 0;
  // value of the input
  let value = 0;
  // output string
  let output = '';

  let data = input.split('');

  data.forEach((element) => {
    value = (value << 8) | element.charCodeAt(0);
    bits += 8;
    while (bits >= 6) {
      // The alphabet is 64 characters long, so we need 6 bits to represent it (2^6 = 64)
      // The `& 63` is to be sure that the index is always less than 64
      //
      // e.x. (127[unicode] -> 011111111) & 00111111 = (00111111 = 63)
      // alphabet64[63] = '/'
      output += alphabet64[(value >>> (bits - 6)) & 63];
      bits -= 6;
    }
  });
  if (bits > 0) {
    output += alphabet64[(value << (6 - bits)) & 63];
  }

  while (output.length % 4 !== 0) {
    output += '=';
  }

  return output;
};
