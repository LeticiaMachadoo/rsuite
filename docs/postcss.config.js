const { NODE_ENV, STYLE_DEBUG } = process.env;
const __DEBUG__ = NODE_ENV === 'development';
const __PRO__ = NODE_ENV === 'production';

const plugins = [];
const optimizeCss = STYLE_DEBUG === 'STYLE' || __PRO__;

optimizeCss && plugins.push(require('autoprefixer')());

optimizeCss &&
  plugins.push(
    require('cssnano')({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: false
          }
        }
      ]
    })
  );

module.exports = {
  plugins
};