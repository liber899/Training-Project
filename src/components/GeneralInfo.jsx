import { Card, TextField, Select } from "@shopify/polaris";

export function GeneralInfo({
  priceName,
  handleNameChange,
  priority,
  handlePriorityChange,
  status,
  handleStatus,
  errorPriceName,
  errorPriority,
}) {
  return (
    <Card title="General Information" sectioned>
      <TextField
        value={priceName}
        onChange={handleNameChange}
        label="Name"
        type="text"
        autoComplete="Name"
        name="priceName"
        error={errorPriceName}
      />
      <TextField
        type="number"
        label="Priority"
        value={priority}
        onChange={handlePriorityChange}
        error={errorPriority}
        helpText={
          <span>
            Please enter an interger from 0 to 99. 0 is the highest priority
          </span>
        }
        name="prioritySelected"
      />
      <Select
        label="Status"
        options={["Enable", "Disable"]}
        value={status}
        onChange={handleStatus}
        name="statusbarSelected"
      />
    </Card>
  );
}
