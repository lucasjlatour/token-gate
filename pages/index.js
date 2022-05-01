import { useAccount, useConnect, useDisconnect, useEnsName } from 'wagmi';
import Link from 'next/link'

const Home = () => {
  const { data: account } = useAccount();
  const { data: ensName } = useEnsName({ address: account?.address });
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  if (account) {
    return (
      <div className='py-24 text-center'>
        <div>
          {ensName ? `${ensName} (${account.address})` : account.address}
        </div>
        
        <div>Connected to {account?.connector?.name}</div>
        
        <button
          className='rounded bg-slate-200 p-2'
          onClick={() => disconnect()}
        >
          Disconnect
        </button>
        
        <AccessSection />
      </div>

    );
  }

  return (
    <div className='py-24 text-center'>
      <h1 className='text-2xl font-bold'>Welcome to super secret group</h1>
      <p className='mt-10'>Connect your wallet:</p>
      <div className='mt-5 flex justify-center gap-6'>
        {connectors.map((connector) => {
          return (
            <button
              className='rounded bg-slate-200 p-2'
              key={connector.id}
              onClick={() => connect(connector)}
            >
              {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isConnecting &&
                connector.id === pendingConnector?.id &&
                ' (connecting)'}
            </button>
          );
        })}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  );
};

const AccessSection = () => {
  return (
    <div className='mt-10'>
      <hr className='my-4' />
      <h2 className='text-xl font-bold'>Access Site with NFT</h2>
      <div className='mt-5 flex justify-center gap-6'>
        <button className='rounded bg-slate-200 p-2'>
        <Link href="/gated">
          <a>Connect</a>
        </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
