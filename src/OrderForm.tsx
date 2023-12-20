import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface OrderFormProps {
  onNewOrder: (order: {
    name: string;
    chickens: number;
    potatoBuckets: number;
  }) => void;
}

export default function OrderForm({ onNewOrder }: OrderFormProps) {
  const [name, setName] = useState("");
  const [chickens, setChickens] = useState(0);
  const [potatoBuckets, setPotatoBuckets] = useState(0);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && chickens >= 0 && potatoBuckets >= 0) {
      onNewOrder({ name, chickens, potatoBuckets });
      setName("");
      setChickens(0);
      setPotatoBuckets(0);
      nameInputRef.current?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        bgcolor="lightsalmon"
        p={2}
        my={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" sx={{ width: 200 }}>
          <TextField
            label="Prénom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            inputProps={{ style: { fontSize: 20 } }}
            sx={{ width: 180, bgcolor: "white" }}
            inputRef={nameInputRef}
          />
        </Box>
        <Box display="flex" alignItems="center" sx={{ gap: 2, width: 250 }}>
          <Box display="flex" alignItems="center" sx={{ gap: 2, width: 100 }}>
            <Box
              component="img"
              src="chicken.png"
              alt="chicken"
              sx={{ width: 50, height: 50 }}
            />
            <Typography variant="h5">{chickens}</Typography>
          </Box>
          <IconButton
            onClick={() => setChickens(chickens + 0.5)}
            sx={{ border: "1px solid black" }}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            onClick={() => setChickens(chickens - 0.5)}
            disabled={chickens <= 0}
            sx={{ border: "1px solid black" }}
          >
            <RemoveIcon />
          </IconButton>
        </Box>
        <Box display="flex" alignItems="center" sx={{ gap: 2, width: 250 }}>
          <Box display="flex" alignItems="center" sx={{ gap: 2, width: 100 }}>
            <Box
              component="img"
              src="potato.png"
              alt="potato"
              sx={{ width: 50, height: 50 }}
            />
            <Typography variant="h5">{potatoBuckets}</Typography>
          </Box>
          <IconButton
            onClick={() => setPotatoBuckets(potatoBuckets + 1)}
            sx={{ border: "1px solid black" }}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            onClick={() => setPotatoBuckets(potatoBuckets - 1)}
            disabled={potatoBuckets <= 0}
            sx={{ border: "1px solid black" }}
          >
            <RemoveIcon />
          </IconButton>
        </Box>
        <Button type="submit" variant="contained" sx={{ width: 200 }}>
          Ajouter
        </Button>
      </Box>
    </form>
  );
}
