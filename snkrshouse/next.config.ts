import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true, // Ignora erros do ESLint durante o build
	},
	typescript: {
		ignoreBuildErrors: true, // Ignora erros de TypeScript durante o build
	},
};
export default nextConfig;
