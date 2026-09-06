/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler (React 19) auto-memoizes components, so we get the benefit
  // of useMemo/useCallback without writing them by hand.
  reactCompiler: true,
};

module.exports = nextConfig;
