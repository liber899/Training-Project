import { Card, TextField, RadioButton, Stack } from "@shopify/polaris";

export default function CustomPrice({
  handleCustomPriceOption,
  handleAmountChange,
  customPrice,
  amount,
  errorAmount,
}) {
  return (
    <Card title="Custom Prices" sectioned>
      <Stack vertical>
        <RadioButton
          label="Apply a price to selected products"
          checked={customPrice === "a"}
          id="a"
          name="Custom price"
          onChange={handleCustomPriceOption}
        />
        <RadioButton
          label="Decrease a fixed amount of the original prices of selected products"
          id="b"
          name="Custom price"
          checked={customPrice === "b"}
          onChange={handleCustomPriceOption}
        />
        <RadioButton
          label="Decrease the original prices of selected products by a percentages (%)"
          id="c"
          name="Custom price"
          checked={customPrice === "c"}
          onChange={handleCustomPriceOption}
        />
        <TextField
          type="number"
          label="Amount"
          value={amount}
          onChange={handleAmountChange}
          // error="Province is required"
          name="Amount"
          error={errorAmount}
        />
      </Stack>
    </Card>
  );
}
