#!/bin/bash

# Deploy script for fudan-pgx organization website

echo "Building and deploying fudanpgx and chihope projects..."

# Build fudanpgx
echo "Building fudanpgx..."
cd fudanpgx
npm install
npm run build
cd ..

# Build chihope
echo "Building chihope..."
cd chihope
npm install
npm run build
cd ..

# Create deployment directory structure
echo "Creating deployment structure..."
mkdir -p deploy/fudanpgx
mkdir -p deploy/chihope

# Copy built files
cp -r fudanpgx/dist/* deploy/fudanpgx/
cp -r chihope/dist/* deploy/chihope/

# Create index.html for root redirect
cat > deploy/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Fudan PGX</title>
    <meta http-equiv="refresh" content="3; url=/fudanpgx/">
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: white;
        }
        .container {
            text-align: center;
        }
        .spinner {
            width: 60px;
            height: 60px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .title {
            font-size: 2.5em;
            font-weight: 300;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .subtitle {
            font-size: 1.2em;
            opacity: 0.9;
            margin-bottom: 30px;
        }
        .redirect-text {
            font-size: 1em;
            opacity: 0.8;
        }
        .link {
            color: #ffd700;
            text-decoration: none;
            font-weight: 500;
        }
        .link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <h1 class="title">Fudan PGX</h1>
        <p class="subtitle">Pharmacogenomics Research Lab</p>
        <p class="redirect-text">
            Redirecting to <a href="/fudanpgx/" class="link">main website</a>...
        </p>
    </div>
</body>
</html>
EOF

echo "Deployment files ready in ./deploy/"
echo "You can now push this to your GitHub repository" 