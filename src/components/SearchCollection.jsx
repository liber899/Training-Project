import { Autocomplete, Tag, Stack } from "@shopify/polaris";
import React from "react";

export default function SearchCollection({
  collectionOptions,
  selectedCollections,
  textCollectionField,
  handleCollectionSelection,
  isLoading,
  selectedTagMarkup,
}) {
  return (
    <Stack vertical>
      <Autocomplete
        allowMultiple
        options={collectionOptions}
        selected={selectedCollections}
        textField={textCollectionField}
        onSelect={handleCollectionSelection}
        listTitle="Suggested Collections"
        loading={isLoading}
      />
      {selectedTagMarkup}
    </Stack>
  );
}
