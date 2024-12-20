// const config = require('./script/config');
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssUrl from 'postcss-url';
export default {
  plugins: [
    tailwindcss({}),
    autoprefixer({}),
    postcssUrl({
      url: (asset) => {
        console.log(asset.url, '+++++++++++++');
        if (asset.url && !asset.url.startsWith('/') && asset.url.includes('.') && !asset.url.startsWith('data:')) {
          console.log(asset.url, '-----------------');
          // 相对css位置
          return `../../../${asset.url}`;
        }
      },
    }),
  ],
};