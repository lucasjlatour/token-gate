import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import React, { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';


const Gated = () => {
    const { data: account } = useAccount();
    const { data: ensName } = useEnsName({ address: account?.address });
// Replace with your Alchemy api key:
const apiKey = "";

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-rinkeby.alchemyapi.io/v2/${apiKey}`,
);
const [hasNFT, setHasNFT] = useState(false);
const [loading, setLoading] = useState(true);
    
    React.useEffect(async () => {
        // The wallet address / token we want to query for:

        if(account) {
    
        const nfts = await web3.alchemy.getNfts({owner: `${account.address}`})
        console.log(nfts);
       
        for(let i = 0; i < nfts.ownedNfts.length; i++) {
            if(nfts.ownedNfts[i].contract.address == '' && nfts.ownedNfts[i].balance > 0) {
                setHasNFT(true);
            }
        }
        setLoading(false);
    }
    }, []);


    if(loading) {
        return (<div>Loading...</div>);
    } 
    else if(hasNFT) {
        return (<div className="bg-amber-200 text-center h-screen text-xl align-middle py-60"><p>Congrats you have the NFT! 🎉</p><p>Consider your self one of us.</p></div>)
    } else {
        return (<div>Hello you don't seem to have the NFT!</div>)
    }
}


export default Gated;