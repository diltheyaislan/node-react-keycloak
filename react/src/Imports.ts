/* eslint-disable @typescript-eslint/no-explicit-any */
import $ from './assets/vendor/jquery/jquery.js';

declare global {
  interface Window {
    jQuery: any;
    $: any;
  }
}

window.jQuery = $;
window.$ = $;
(global as any).jQuery = $;
(global as any).$ = $;
