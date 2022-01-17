import { ethers, BigNumber } from 'ethers';
import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import { MisfitContext, SignerContext } from "./hardhat/SymfoniContext";

import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import "bootstrap/dist/css/bootstrap.min.css";
interface Domain {
  name: string,
  version: string,
  verifyingContract: string,
  chainId: number,
}




function App() {
  const misfit = useContext(MisfitContext);
  const [signer,] = useContext(SignerContext);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [joinedRaffle, setJoinedRaffle] = useState<boolean>();

  const [domain, setDomain] = useState<Domain>({
    name: "Misfit-Voucher",
    version: "1",
    verifyingContract: "",
    chainId: 1337,
  })


  const [numberWantToBuy, setNumberWantToBuy] = useState<number>()

  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0));
  const [tokenList, setTokenList] = useState<BigNumber[]>([]);
  const [unsignedVouchers,setUnsignedVouchers] = useState<String[]>([]);
  const [signVoucherKey,setSignVoucherKey] = useState<string>()
  const [canMint,setCanMint] = useState<BigNumber>(BigNumber.from(0));

  useEffect(() => {
    const updateParameters = async () => {
      if (misfit.instance && signer && signer.provider) {
        console.log("update param misfit.instance",misfit.instance)
        const singerAddr = await signer.getAddress();
        setIsAdmin(singerAddr === await misfit.instance.owner());
        setDomain({ ...domain, verifyingContract: misfit.instance.address, chainId: await signer.getChainId()});
        // setVoucher({ ...voucher, client: singerAddr });
        setBalance(await signer.provider.getBalance(misfit.instance.address));
        setCanMint(await misfit.instance.allowlist(singerAddr))
        // setTokenList(await misfit.instance.tokensOfOwner(singerAddr));

        
      
      }
    }

    updateParameters().then(() => {

    });
    if (isAdmin) {}

    
    const getMyRaffle = async () => {
      if (misfit.instance && signer && signer.provider) {
        const singerAddr = await signer.getAddress();
        const fetchRes = await  fetch("http://localhost:3080/getMyRaffle", {
          method: "GET",
          headers: {
            address: singerAddr
          }
        }).then((res) => res.json())
        console.log("getMyRaffle fetchRes",fetchRes)
        setJoinedRaffle(fetchRes)
      }
      
    }
    

    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [misfit, signer]);


  const inputNumberWantToBuy = (e: React.FormEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value);
    setNumberWantToBuy(Number(e.currentTarget.value));
  }


  const allowlistMint = async () => {
    if (misfit.instance && numberWantToBuy && signer) {
      const myAddress = await signer.getAddress()
      console.log("redeem myAddress",myAddress)
      try {
        const tx = await misfit.instance.allowlistMint(numberWantToBuy,{value: ethers.utils.parseEther("0.07").mul(numberWantToBuy)});
        const receipt = await tx.wait();
        console.log("receipt",receipt)
        // if (receipt.status) {
        //   setTokenList(await misfit.instance.tokensOfOwner(myAddress));
        // }
      }
      catch (err: any) {
        err.data ? alert(err.data.message) : alert(err.message);
      }
    }
  }

  
  const joinraffle = async () => {
    if (misfit.instance && signer && signer.provider && numberWantToBuy) {
      const singerAddr = await signer.getAddress();
      const fetchRes = await fetch("http://localhost:3080/joinRaffle", {
        method:"POST",
        headers: {
          address: singerAddr,
          mintnumber: String(numberWantToBuy)
        }
      }).then((res) => res.text())
      if (fetchRes == "OK") {
        setJoinedRaffle(true)
      } else {
        setJoinedRaffle(false)
      }
    }
  }




  const startRaffle = async () => {
    if (misfit.instance && signer && signer.provider) {
      const fetchRes = await fetch("http://localhost:3080/startRaffle", {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sig: await signer.signMessage("startRaffle")
        })
      }).then((res) => res.text())
      .then((res) => {
        console.log("startRaffle res",res)
      })
    }
  }
  const endRaffle = async () => {
    if (misfit.instance && signer && signer.provider) {
      const fetchRes = await fetch("http://localhost:3080/endRaffle", {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sig: await signer.signMessage("endRaffle")
        })
      }).then((res) => res.json())
      .then((res) => {
        console.log("endRaffle res",res)
      })
    }
  }

  
  const joinRaffle = async () => {
    if (misfit.instance && signer && signer.provider) {
      await fetch("http://localhost:3080/joinRaffle", {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sig: await signer.signMessage("joinRaffle")
        })
      }).then((res) => res.text())
      .then((res) => {
        console.log("joinRaffle res",res)
      })
    }
  }
  
  const withdraw = async () => {
    if (misfit.instance) {
      try {
        const tx = await misfit.instance.withdraw(balance);
        const receipt = await tx.wait();
        if (receipt.status && signer && signer.provider) {
          setBalance(await signer.provider.getBalance(misfit.instance.address))
        }
      }
      catch(err: any) {
        err.data ? alert(err.data.message) : alert(err.message);
      }
    }
  }

  const getUnsignedVouchers = async () => {
    if (misfit.instance && signer && signer.provider) {
      const singerAddr = await signer.getAddress();
      const fetchRes = await  fetch("http://localhost:3080/getUnsignedVouchers", {
        method: "GET",
        headers: {
          sig: await signer.signMessage("getVouchers")
        }
      }).then((res) => res.json())
      console.log("getUnsignedVouchers",fetchRes)
      setUnsignedVouchers(fetchRes)
    }
  }

  function sleep(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
  }

  // const signVouchersKey = async () => {

  // }
  // const signVouchers = async () => {
  //   if (misfit.instance && signer && signer.provider && unsignedVouchers.length > 0 && domain && signVoucherKey) {
  //     const promisedVouchers =  await unsignedVouchers.map(async (voucher: any) => {
  //       voucher = {
  //         client: voucher.client,
  //         time: ethers.BigNumber.from(voucher.time),
  //         price: ethers.BigNumber.from(voucher.price),
  //         max_mint: voucher.max_mint

  //     }
  //       console.log("signVoucher looping voucher",voucher,JSON.stringify(voucher))

  //       const types = {
  //         NFTVoucherType: [
  //           { name: "client", type: "address" },
  //           { name: "time", type: "uint256" },
  //           { name: "price", type: "uint256" },
  //           { name: "max_mint", type: "uint256" }
  //         ]
  //       }
  //       console.log("domain",domain)
  //       const sig = await signer._signTypedData(domain,types,voucher)
  //       return {
  //         voucher: voucher,
  //         sig
  //       }
  //     })
  //     const signedVouchers = await Promise.all(promisedVouchers)
  //     console.log("signedVouchers",signedVouchers)
  //     const fetchRes = await  fetch("http://localhost:3080/signedVouchers", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         sig: signVoucherKey
  //       },
  //       body: JSON.stringify({
  //         vouchers:signedVouchers
  //       })
  //     }).then((res) => res.json())
  //     console.log("signVouchers",fetchRes)
  //     setUnsignedVouchers([])
  //   }
  // }
  // components
  const radioGroup = (id:string,maxNumber:number) => {
    const arrayKeys = Array.from(Array(maxNumber).keys());
    return (
      <ToggleButtonGroup
      name={id}
      type="radio"
      // value={value}
      // onChange={handleChange}
      > 
        {
          arrayKeys.map((key) => {
            return <ToggleButton value={key}>{key}</ToggleButton>
          })
      
        }
    </ToggleButtonGroup>
    )
  }
  return (
    <div className="App">
      {
        isAdmin  ?
        <div>
          <h1>Admin Page</h1>
        </div>
      :
        <div>
          <h1>Client Page</h1><br/>
          canMint: { JSON.stringify(canMint.toNumber()) }
          <input onChange={inputNumberWantToBuy}></input>
          <button onClick={allowlistMint}>mint</button>
        </div>
      }
    </div>
  );
}

export default App;
