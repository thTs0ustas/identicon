const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

// (h) value = 01101000
// bits = 8
// (00001101 & 0011111) = 00001101 (alphabet[13]=='N')
// output = 'N'
// bits = 3
//
// bits = 3 + 8 = 11
// (e) value = 01100101
// (value >> 6 -> 00000001 & 00011111 -> 00000001) (alphabet[1]=='B')
// output = 'NB'
// bits = 6 'bits are still greater than 5'
// (e) (value >> 1 -> 00110010 & 00011111 -> 00010010) (alphabet[18]=='S')
// output = 'NBS'

/***
 * Base32 encoding
 * @description
 * The provided JavaScript function, base32Encode, is designed to encode a given input string into a Base32 encoded string.

 * @param {string} input
 * @param {boolean} padding
 *
 * @returns {string} output
 */
export function base32Encode(input: string, padding = true) {
  let bits = 0;
  // value of the input
  let value = 0;
  // output string
  let output = '';

  let data = input.split('');
  data.forEach((element) => {
    value = (value << 8) | element.charCodeAt(0);
    bits += 8;
    while (bits >= 5) {
      // The alphabet is 32 characters long, so we need 5 bits to represent it (2^5 = 32)
      // The `& 31` is to be sure that the index is always less than 32
      //
      // e.x. ('e' = 101[unicode] -> 001100101) & 00011111 = (00010010 = 18)
      // alphabet[18] = 'S'
      output += alphabet[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  });
  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31];
  }

  if (padding) {
    while (output.length % 8 !== 0) {
      output += '=';
    }
  }

  return output;
}
