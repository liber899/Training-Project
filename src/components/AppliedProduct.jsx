import {
  Card,
  TextField,
  RadioButton,
  Stack,
  MediaCard,
} from "@shopify/polaris";

import { ResourcePicker } from "@shopify/app-bridge-react";
import SearchTags from "./SeachTag";
import SearchCollection from "./SearchCollection";

export default function AppliedProduct({
  handleProductRule,
  productRule,
  open,
  cancelResoursePicker,
  handleProductSelection,
  handleProductPicker,
  selectedProducts,
  displayProducts,
  selectedTags,
  setDisplayProducts,
  selectedCollection,
  updateTags,
  options,
  selectedOptions,
  updateSelection,
  load,
  textField,
  tagMarkup,
  collectionOptions,
  selectedCollections,
  textCollectionField,
  handleCollectionSelection,
  isLoading,
  selectedTagMarkup,
}) {
  return (
    <Card title="Apply to Products" sectioned>
      <ResourcePicker
        resourceType="Product"
        open={open}
        onCancel={cancelResoursePicker}
        onSelection={handleProductSelection}
      />
      <Stack vertical>
        <RadioButton
          label="All products"
          checked={productRule === "All products"}
          id="All products"
          name="products"
          onChange={handleProductRule}
        />
        <RadioButton
          label="Specific products"
          id="Specific products"
          name="products"
          checked={productRule === "Specific products"}
          onChange={handleProductRule}
        />
        {selectedProducts && (
          <TextField
            label="Search Products"
            labelHidden
            type="text"
            placeholder="Search product"
            onFocus={handleProductPicker}
          />
        )}
        {selectedProducts &&
          displayProducts &&
          displayProducts.map((data) => (
            <MediaCard
              title={data.productName}
              description="Discover how Shopify can power up your entrepreneurial journey."
              popoverActions={[
                {
                  content: "Dismiss",
                  onAction: () => {
                    setDisplayProducts((prev) => {
                      return [...prev.filter((el) => el.id !== data.id)];
                    });
                  },
                },
              ]}
              size="small"
            >
              <img
                alt=""
                width="100%"
                height="100%"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                src={data.image ? data.image : "#"}
              />
            </MediaCard>
          ))}
        <RadioButton
          label="Product collections"
          id="Product collections"
          name="products"
          checked={productRule === "Product collections"}
          onChange={handleProductRule}
        />
        {selectedCollection && (
          <SearchCollection
            key="searchCollection"
            collectionOptions={collectionOptions}
            selectedCollections={selectedCollections}
            textCollectionField={textCollectionField}
            handleCollectionSelection={handleCollectionSelection}
            isLoading={isLoading}
            selectedTagMarkup={selectedTagMarkup}
          />
        )}
        <RadioButton
          label="Product tags"
          id="Product tags"
          name="products"
          checked={productRule === "Product tags"}
          onChange={handleProductRule}
        />
        {selectedTags && (
          <SearchTags
            key="searchTag"
            updateTags={updateTags}
            options={options}
            selectedOptions={selectedOptions}
            updateSelection={updateSelection}
            load={load}
            textField={textField}
            tagMarkup={tagMarkup}
          />
        )}
      </Stack>
    </Card>
  );
}
