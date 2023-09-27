import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ConnectorData, useAccount } from "wagmi";

export default function NetworkSelector() {
  const [network, setNetwork] = useState("");
  const { connector } = useAccount();

  useEffect(() => {
    const handleChange = ({ chain }: ConnectorData) => {
      if (chain?.unsupported || !chain?.id) return;
      setNetwork(String(chain.id));
      connector?.connect({ chainId: chain.id });
    };

    connector?.on("change", handleChange);
    return () => {
      connector?.off("change", handleChange);
    };
  }, [connector]);

  const handleInputChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setNetwork(value);
    connector?.connect({ chainId: +value });
  };

  return (
    <FormControl sx={{ width: "150px", mr: 1 }}>
      <InputLabel>Network</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={network}
        label="Age"
        onChange={handleInputChange}
      >
        {connector?.chains.map((chain) => (
          <MenuItem key={chain.id} value={chain.id}>
            {chain.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
