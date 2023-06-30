import { useState } from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";
import { type Plan } from "../helpers/types";

import Arcade from "@mui/icons-material/SmartToy";
import Advanced from "@mui/icons-material/Laptop";
import Pro from "@mui/icons-material/Games";

interface PlanProps {
  plan: Plan;
  selectedType: string;
  isSelected?: boolean;
  onSelect: (plan: Plan) => void;
}

const PlanCard = ({ plan, selectedType, onSelect }: PlanProps) => {
  const [selected, setSelected] = useState(false);

  const handleSelect = (plan: Plan) => {
    setSelected(true);
    onSelect(plan);
  };

  return (
    <Card
      sx={{ marginRight: "20px", minWidth: 155, cursor: "pointer" }}
      component={"button"}
      onClick={() =>
        handleSelect({
          title: plan.title,
          price:
            selectedType === "monthly" ? plan.monthlyPrice : plan.yearlyPrice,
        })
      }
    >
      <CardContent>
        {plan.title === "Arcade" ? (
          <Arcade />
        ) : plan.title === "Advanced" ? (
          <Advanced />
        ) : (
          <Pro />
        )}
        <Typography variant="h6" component="div" gutterBottom>
          {plan.title}
        </Typography>
        <Typography variant="subtitle2" color={"#656565"}>
          {selectedType === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
