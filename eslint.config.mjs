// Next 16 ships native flat configs; the old FlatCompat('next/...') eslintrc bridge breaks on eslint 10
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'dist/**'] },
  ...coreWebVitals,
  ...typescript,
];

export default eslintConfig;
