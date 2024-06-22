/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains : ["firebasestorage.googleapis.com"],
        
        remotePatterns:[
            {
                hostname: "a0.muscache.com",
                protocol:"https",
                port: "",
            },
           
            {
                protocol:"https",
                hostname:"cdn.dummyjson.com",
                port:"",
               // pathname:'/u/**',
            },
           
        ]
    }
};

export default nextConfig;
