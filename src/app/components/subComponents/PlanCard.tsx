import { useState, useEffect } from "react";
import { Card, CardContent, Radio, Typography, Box } from "@mui/material";
import { type Plan } from "../../helpers/types";

import Arcade from "@mui/icons-material/SmartToy";
import Advanced from "@mui/icons-material/Laptop";
import Pro from "@mui/icons-material/Games";

interface PlanProps {
  plan: Plan;
  register: any;
  selectedPlanType: string;
  // selectedPlan: Plan | null;
  // selectedType: string | undefined;
  // isSelected?: boolean;
  // onSelect: (plan: Plan) => void;
}

const PlanCard = ({ plan, register, selectedPlanType }: PlanProps) => {
  const [selected, setSelected] = useState(false);
  // useEffect(() => {
  //   if (selectedPlan !== null && selectedPlan.title === plan.title) {
  //     setSelected(true);
  //   } else {
  //     setSelected(false);
  //   }
  // }, [selectedPlan, plan]);

  const handleSelect = (id: Plan) => {
    // setSelected(true);
    // const SelectedPlan = { ...plan, type: selectedType };
    // onSelect(SelectedPlan);
  };

  const cardStyle = {
    minWidth: 155,
    cursor: "pointer",
    border: "1px solid",
    borderColor: selected ? "#3f51b5" : "transparent",
    "@media (max-width:600px)": {
      minWidth: "auto",
    },
  };

  const CardContentStyle = {
    "@media (max-width:600px)": {
      padding: "5px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "25px",
    },
  };

  return (
    <Card sx={cardStyle} component={Radio} value={plan.id}>
      <CardContent sx={CardContentStyle}>
        {plan.title === "Arcade" ? (
          <Arcade />
        ) : plan.title === "Advanced" ? (
          <Advanced />
        ) : (
          <Pro />
        )}
        <Box style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" component="div" gutterBottom>
            {plan.title}
          </Typography>
          <Typography variant="subtitle2" color={"#656565"}>
            {selectedPlanType === "monthly"
              ? plan.monthlyPrice
              : plan.yearlyPrice}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlanCard;
