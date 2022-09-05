import { Card, TextField, Select } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { useStore, actions } from "../store";

export default function GI() {
  const [state, dispatch] = useStore();
  const { priceName, priority, status } = state;

  return (
    <Card title="General Information" sectioned>
      <TextField
        label="Name"
        value={priceName}
        onChange={(newValue) => {
          dispatch(actions.setPricenameInput(newValue));
        }}
        autoComplete="off"
      />
      <TextField
        label="Priority"
        value={priority}
        onChange={(newValue) => {
          dispatch(actions.setPriorityInput(newValue));
        }}
        autoComplete="off"
      />
      <Select
        label="Status"
        options={["Enable", "Disable"]}
        value={status}
        onChange={(newValue) => {
          dispatch(actions.setStatusInput(newValue));
        }}
        name="statusbarSelected"
      />
    </Card>
  );
}
