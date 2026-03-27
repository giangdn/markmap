import postcssNested from 'postcss-nested';
import autoprefixer from 'autoprefixer';
import postcssCalc from 'postcss-calc';

export default {
  plugins: [postcssNested, autoprefixer, postcssCalc],
};
