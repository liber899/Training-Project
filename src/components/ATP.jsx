import {
  Card,
  TextField,
  RadioButton,
  Stack,
  MediaCard,
  Tag,
} from "@shopify/polaris";

import { ResourcePicker } from "@shopify/app-bridge-react";
import SearchCollection from "./SearchCollections";
import SeachTag from "./SearchTags";
import { useStore, actions } from "../store";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";
import { useCallback, useEffect, useState } from "react";

export default function ATP() {
  const [state, dispatch] = useStore();
  const { productRule, productPicker, selectedProducts } = state;

  const openProductPicker = () => {
    dispatch(actions.openProductPicker());
  };

  const closeProductPicker = () => {
    dispatch(actions.closeProductPicker());
  };

  const handleProductSelection = (value) => {
    const response = value.selection.map((el) => {
      const priceRange = el.variants.map((el) => el.price);
      return {
        productName: el.title,
        image: el.images[0]?.originalSrc,
        price: [...priceRange],
        id: el.id,
      };
    });
    dispatch(actions.displaySelectedProducts(response));
    closeProductPicker();
  };

  const removeSelectedProduct = (value) => {
    const response = selectedProducts.filter((el) => el.id !== value.id);
    dispatch(actions.deleteSelectedProducts(response));
  };

  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);

  //fetch data on all products

  const updateProductData = useCallback(async () => {
    const rawData = await fetch("/allproducts").then((res) => res.json());
    const response = await rawData.data.products.edges.map((el) => {
      const priceRange = el.node.variants.edges.map((price) => price.node);
      return {
        productName: el.node.title,
        id: el.node.id,
        price: [...priceRange],
        tags: [...el.node.tags],
      };
    });
  }, []);

  const updateCollectionData = useCallback(async () => {
    const rawData = await fetch("/collections").then((res) => res.json());
    const response = await rawData.data.collections.edges.map((el) => {
      return {
        value: el.node.title,
        label: el.node.title,
        image: el.node.image ? el.node.image.url : null,
        id: el.node.id,
      };
    });
    dispatch(actions.setCollectionData(response));
  }, []);

  useEffect(() => {
    updateCollectionData();
  }, [updateCollectionData]);

  const updateTagData = useCallback(async () => {
    const rawData = await fetch("/tag").then((res) => res.json());
    const response = [...rawData.data.shop.productTags.edges];
    const abc = response.map((el) => {
      return {
        value: el.node,
        label: el.node,
      };
    });
    dispatch(actions.displaySelectedTags(abc));
  }, []);

  useEffect(() => {
    updateTagData();
  }, [updateTagData]);

  const updateTagCollection = useCallback(async () => {
    const rawData = await fetch("/productwithcollection").then((res) =>
      res.json()
    );
    const response = await rawData.data?.products.edges.map((el) => {
      const collections = el.node.collections.edges.map(
        (collection) => collection.node.id
      );
      return {
        id: el.node.id,
        collections: [...collections],
      };
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateTagCollection();
    }, 1000);
    updateProductData();
    return () => clearTimeout(timer);
  }, [updateProductData]);

  return (
    <Card title="Apply to Products" sectioned>
      <ResourcePicker
        resourceType="Product"
        open={productPicker}
        onCancel={closeProductPicker}
        onSelection={handleProductSelection}
      />
      <Stack vertical>
        <RadioButton
          label="All products"
          checked={productRule === "All products"}
          id="All products"
          name="products"
          onChange={(_checked, newValue) =>
            dispatch(actions.setProductInput(newValue))
          }
        />
        <RadioButton
          label="Specific products"
          id="Specific products"
          name="products"
          checked={productRule === "Specific products"}
          onChange={(_checked, newValue) =>
            dispatch(actions.setProductInput(newValue))
          }
        />
        {productRule === "Specific products" && (
          <TextField
            label="Search Products"
            labelHidden
            type="text"
            placeholder="Search product"
            onFocus={openProductPicker}
          />
        )}
        {productRule === "Specific products" &&
          selectedProducts &&
          selectedProducts.map((data) => {
            return (
              <MediaCard
                title={data.productName}
                description=""
                popoverActions={[
                  {
                    content: "Dismiss",
                    onAction: () => {
                      removeSelectedProduct(data);
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
            );
          })}
        <RadioButton
          label="Product collections"
          id="Product collections"
          name="products"
          checked={productRule === "Product collections"}
          onChange={(_checked, newValue) =>
            dispatch(actions.setProductInput(newValue))
          }
        />
        {productRule === "Product collections" && <SearchCollection />}
        <RadioButton
          label="Product tags"
          id="Product tags"
          name="products"
          checked={productRule === "Product tags"}
          onChange={(_checked, newValue) =>
            dispatch(actions.setProductInput(newValue))
          }
        />
        {productRule === "Product tags" && <SeachTag />}
      </Stack>
    </Card>
  );
}
