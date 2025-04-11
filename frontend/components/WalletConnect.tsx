"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  LogOut,
  ChevronDown,
  ExternalLink,
  Copy,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [copied, setCopied] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const { data: balance } = useBalance({
    address,
    chainId: 999999999,
  });

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openExplorer = () => {
    if (address) {
      window.open(
        `https://sepolia.explorer.zora.energy/address/${address}`,
        "_blank"
      );
    }
  };

  const handleConnectClick = (connector: any) => {
    connect({ connector });
    setIsWalletModalOpen(false);
  };

  const getWalletIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "metamask":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.3622 2L13.0252 8.3219L14.4534 4.9252L21.3622 2Z"
              fill="#E17726"
              stroke="#E17726"
              strokeWidth="0.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.63782 2L10.9044 8.3899L9.54662 4.9252L2.63782 2Z"
              fill="#E27625"
              stroke="#E27625"
              strokeWidth="0.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.4386 16.9132L16.2679 20.4378L20.8179 21.7977L22.1252 17.0078L18.4386 16.9132Z"
              fill="#E27625"
              stroke="#E27625"
              strokeWidth="0.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.88477 17.0078L3.18242 21.7977L7.73242 20.4378L5.56174 16.9132L1.88477 17.0078Z"
              fill="#E27625"
              stroke="#E27625"
              strokeWidth="0.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.46445 11.1065L6.25195 13.1931L10.7493 13.4164L10.5767 8.49609L7.46445 11.1065Z"
              fill="#E27625"
              stroke="#E27625"
              strokeWidth="0.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.5355 11.1064L13.3707 8.42773L13.2507 13.4163L17.748 13.193L16.5355 11.1064Z"
              fill="#E27625"
              stroke="#E27625"
              strokeWidth="0.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.73242 20.4378L10.4571 19.0023L8.09992 17.0418L7.73242 20.4378Z"
              fill="#E27625"
              stroke="#E27625"
              strokeWidth="0.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.543 19.0023L16.2677 20.4378L15.9002 17.0418L13.543 19.0023Z"
              fill="#E27625"
              stroke="#E27625"
              strokeWidth="0.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "coinbase wallet":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" fill="#0052FF" />
            <path
              d="M12 6C8.7 6 6 8.7 6 12C6 15.3 8.7 18 12 18C15.3 18 18 15.3 18 12C18 8.7 15.3 6 12 6ZM14.8 14.8H9.2V9.2H14.8V14.8Z"
              fill="white"
            />
          </svg>
        );
      case "walletconnect":
        return (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.342 9.792C9.3 6.834 14.1 6.834 17.058 9.792L17.418 10.152C17.598 10.332 17.598 10.62 17.418 10.8L16.278 11.94C16.188 12.03 16.044 12.03 15.954 11.94L15.474 11.46C13.446 9.432 9.954 9.432 7.926 11.46L7.41 11.976C7.32 12.066 7.176 12.066 7.086 11.976L5.946 10.836C5.766 10.656 5.766 10.368 5.946 10.188L6.342 9.792ZM19.086 11.82L20.094 12.828C20.274 13.008 20.274 13.296 20.094 13.476L15.474 18.096C15.294 18.276 15.006 18.276 14.826 18.096L11.574 14.844C11.529 14.799 11.457 14.799 11.412 14.844L8.16 18.096C7.98 18.276 7.692 18.276 7.512 18.096L2.892 13.476C2.712 13.296 2.712 13.008 2.892 12.828L3.9 11.82C4.08 11.64 4.368 11.64 4.548 11.82L7.8 15.072C7.845 15.117 7.917 15.117 7.962 15.072L11.214 11.82C11.394 11.64 11.682 11.64 11.862 11.82L15.114 15.072C15.159 15.117 15.231 15.117 15.276 15.072L18.528 11.82C18.708 11.64 18.996 11.64 19.176 11.82H19.086Z"
              fill="#3B99FC"
            />
          </svg>
        );
      default:
        return <Wallet className="h-5 w-5" />;
    }
  };

  return (
    <div>
      {isConnected && address ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-electric/30 bg-sky/20 hover:bg-sky/30 text-charcoal rounded-full"
            >
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-mint mr-2 animate-pulse"></div>
                <span className="mr-2">{formatAddress(address)}</span>
                <span className="font-mono text-electric">
                  {balance?.formatted
                    ? Number.parseFloat(balance.formatted).toFixed(4)
                    : "0.0000"}{" "}
                  {balance?.symbol}
                </span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white border border-ghost rounded-lg">
            <div className="px-2 py-1.5 text-xs text-stone">
              Connected Wallet
            </div>
            <DropdownMenuSeparator className="bg-ghost" />
            <div className="px-2 py-2">
              <p className="text-sm font-medium text-charcoal mb-1">Balance</p>
              <p className="text-lg font-mono text-electric">
                {balance?.formatted
                  ? Number.parseFloat(balance.formatted).toFixed(4)
                  : "0.0000"}{" "}
                {balance?.symbol}
              </p>
            </div>
            <DropdownMenuSeparator className="bg-ghost" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuItem
                    className="cursor-pointer flex items-center text-stone hover:text-charcoal hover:bg-sky/20"
                    onClick={copyAddress}
                  >
                    {copied ? (
                      <Check className="mr-2 h-4 w-4 text-mint" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4 text-electric" />
                    )}
                    {copied ? "Copied!" : "Copy Address"}
                  </DropdownMenuItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{address}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuItem
              className="cursor-pointer flex items-center text-stone hover:text-charcoal hover:bg-sky/20"
              onClick={openExplorer}
            >
              <ExternalLink className="mr-2 h-4 w-4 text-electric" />
              View on Explorer
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-ghost" />
            <DropdownMenuItem
              className="cursor-pointer flex items-center text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => disconnect()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={() => setIsWalletModalOpen(true)}
          className="rounded-full border-electric bg-electric hover:bg-electric/90 text-white"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      )}

      <Dialog open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen}>
        <DialogContent className="bg-white border-ghost rounded-lg sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-electric to-blue-500">
              Connect Wallet
            </DialogTitle>
            <DialogDescription className="text-stone">
              Connect your wallet to access advanced prediction features
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            {connectors.map((connector) => (
              <Button
                key={connector.id}
                onClick={() => handleConnectClick(connector)}
                variant="outline"
                className="flex justify-between items-center h-14 border-ghost hover:border-electric hover:bg-sky/10 text-charcoal rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getWalletIcon(connector.name)}
                  <span className="text-base font-medium">
                    {connector.name}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-stone" />
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
