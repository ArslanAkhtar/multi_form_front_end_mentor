import { useState, useEffect } from "react";
import { Card, CardContent, Button, Typography } from "@mui/material";
import { type Plan } from "../helpers/types";

import Arcade from "@mui/icons-material/SmartToy";
import Advanced from "@mui/icons-material/Laptop";
import Pro from "@mui/icons-material/Games";
import { borderColor } from "@mui/system";

interface PlanProps {
  plan: Plan;
  selectedPlan: Plan | null;
  selectedType: string | undefined;
  isSelected?: boolean;
  onSelect: (plan: Plan) => void;
}

const PlanCard = ({
  plan,
  selectedPlan,
  selectedType,
  onSelect,
}: PlanProps) => {
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (selectedPlan !== null && selectedPlan.title === plan.title) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [selectedPlan, plan]);

  const handleSelect = (plan: Plan) => {
    setSelected(true);
    const SelectedPlan = { ...plan, type: selectedType };
    onSelect(SelectedPlan);
  };

  return (
    <Card
      sx={{
        marginRight: "20px",
        minWidth: 155,
        cursor: "pointer",
        border: "1px solid",
        borderColor: selected ? "#3f51b5" : "transparent",
      }}
      component={Button}
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
