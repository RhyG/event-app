import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import { ReadableStream } from 'web-streams-polyfill';

// @ts-expect-error
globalThis.ReadableStream = ReadableStream;
