import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface OrderProps {
  order: {
    id: number;
    name: string;
    chickens: number;
    potatoBuckets: number;
    delivered: boolean;
  };
  onDelivered: (id: number) => void;
}

export default function Order({ order, onDelivered }: OrderProps) {
  const { id, name, chickens, potatoBuckets, delivered } = order;

  const handleDelivered = () => {
    onDelivered(id);
  };

  return (
    <Box
      bgcolor={delivered ? "lightgreen" : "pink"}
      p={2}
      my={1}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h4" sx={{ width: 200 }}>
        {name}
      </Typography>
      <Box display="flex" alignItems="center" sx={{ gap: 2, width: 250 }}>
        <Box
          component="img"
          src="chicken.png"
          alt="chicken"
          sx={{ width: 50, height: 50 }}
        />
        <Typography variant="h5">{chickens}</Typography>{" "}
      </Box>
      <Box display="flex" alignItems="center" sx={{ gap: 2, width: 250 }}>
        <Box
          component="img"
          src="potato.png"
          alt="potato"
          sx={{ width: 50, height: 50 }}
        />
        <Typography variant="h5">{potatoBuckets}</Typography>{" "}
      </Box>
      <Button
        variant="contained"
        onClick={handleDelivered}
        disabled={delivered}
        sx={{ width: 200 }}
      >
        {delivered ? "Livré" : "Livrer"}
      </Button>
    </Box>
  );
}
