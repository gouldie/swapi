require( "@babel/register" )( {
  presets: [ "@babel/env" ],
  plugins: [
    "dynamic-import-node"
  ],
} )
require( "./src/server" )