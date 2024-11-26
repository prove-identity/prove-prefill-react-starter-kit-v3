import { defineConfig, loadEnv } from 'vite';
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from 'vite-tsconfig-paths';
import envCompatible from 'vite-plugin-env-compatible';

export default ({ mode }) => {
    process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), 'REACT_APP_'));

    return defineConfig({
        define: {
            'process.env': process.env,
        },
        envPrefix: 'REACT_APP_',
        plugins: [react(), viteTsconfigPaths(), envCompatible()],
        server: {
            host: '0.0.0.0',
            port: parseInt(process.env.PORT || '3000'),
            //! Proxy configuration 
            proxy: {
                '/api/v3': {
                    target: 'http://localhost:8080', // Backend server
                    changeOrigin: true,
                },
            },
        },
        build: {
            outDir: 'build',
        },
        esbuild: {
            loader: 'tsx',
            include: /src\/.*\.[tj]sx?$/,
            exclude: [],
            sourcemap: true,
        },
    });
};