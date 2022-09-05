import { Autocomplete, Stack } from "@shopify/polaris";
import { CirclePlusMinor } from "@shopify/polaris-icons";

export default function SearchTags({
  updateTags,
  options,
  selectedOptions,
  updateSelection,
  load,
  textField,
  tagMarkup,
}) {
  return (
    <div>
      <Autocomplete
        actionBefore={{
          accessibilityLabel: "Action label",
          badge: {
            status: "new",
            content: "New!",
          },
          content: "Add",
          ellipsis: true,
          icon: CirclePlusMinor,
          onAction: () => {
            updateTags();
          },
        }}
        allowMultiple="true"
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        listTitle="Suggested tags"
        loading={load}
        textField={textField}
      />
      <Stack spacing="tight">{tagMarkup}</Stack>
    </div>
  );
}
