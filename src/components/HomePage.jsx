import { useEffect, useState, useCallback } from "react";
import {
  Card,
  Form,
  FormLayout,
  Button,
  Page,
  Stack,
  Grid,
  Autocomplete,
  Icon,
  Tag,
  DataTable,
} from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";

import { GeneralInfo } from "./GeneralInfo";
import AppliedProduct from "./AppliedProduct";
import CustomPrice from "./CustomPrice";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";

export function PriceFrom() {
  //Genaral infor state

  const [priceName, setPriceName] = useState();
  const [priority, setPriority] = useState();
  const [status, setStatus] = useState("Enable");
  const [error, setError] = useState({
    errorPriceName: "",
    errorPriority: "",
    errorAmount: "",
  });

  const handleNameChange = useCallback((value) => setPriceName(value), []);
  const handlePriorityChange = useCallback((value) => setPriority(value), []);
  const handleStatus = useCallback((value) => setStatus(value), []);

  //custom price state

  const [customPrice, setCustomPrice] = useState("a");

  const [amount, setAmount] = useState();

  const handleCustomPriceOption = useCallback((_checked, newValue) => {
    setCustomPrice(newValue);
  }, []);

  const handleAmountChange = useCallback((value) => setAmount(value), []);

  //Applied to product

  const [productRule, setProductRule] = useState("All products");

  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState({
    products: false,
    collections: false,
    tags: false,
  });

  //all products state

  const [displayAllProducts, setDisplayAllProducts] = useState([]);

  //selected products state

  const [displayProducts, setDisplayProducts] = useState([]);

  //all tag and collection state

  const [productWithCollection, setProductWithCollection] = useState([]);

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
    setDisplayAllProducts(response);
  }, []);

  //fetch data on products with collections

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
    setProductWithCollection(response);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateTagCollection();
    }, 1000);
    updateProductData();
    return () => clearTimeout(timer);
  }, [updateProductData]);

  //handler Product rules

  const handleProductRule = (_checked, newValue) => {
    setProductRule(newValue);
    if (newValue === "All products") {
      setSelected({
        products: false,
        collections: false,
        tags: false,
      });
    }
    if (newValue === "Specific products") {
      setSelected({
        products: true,
        collections: false,
        tags: false,
      });
    }
    if (newValue === "Product collections") {
      setSelected({
        products: false,
        collections: true,
        tags: false,
      });
    }

    if (newValue === "Product tags") {
      setSelected({
        products: false,
        collections: false,
        tags: true,
      });
    }
  };

  //Product picker handlers

  const handleProductPicker = useCallback(() => {
    setOpen(true);
  }, []);

  const cancelResoursePicker = () => {
    setOpen(false);
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
    setDisplayProducts(response);
    setOpen(false);
  };

  // tag states

  const [data, setData] = useState([]);

  const [selectedTags, setSelectedTags] = useState([]);

  //fetch data on all tag

  const updateTagData = useCallback(async () => {
    const rawData = await fetch("/tag").then((res) => res.json());
    const response = await [...rawData.data.shop.productTags.edges];
    const abc = await response.map((el) => {
      return {
        value: el.node,
        label: el.node,
      };
    });
    setData(abc);
  }, []);

  useEffect(() => {
    updateTagData();
  }, [updateTagData]);

  //polaris tag states and handlers

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [load, setLoading] = useState(false);

  useEffect(() => setOptions(data), [data]);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (!load) {
        setLoading(true);
      }

      setTimeout(() => {
        if (value === "") {
          setOptions(data);
          setLoading(false);
          return;
        }
        const filterRegex = new RegExp(value, "i");
        const resultOptions = options.filter((option) =>
          option.label.match(filterRegex)
        );
        setOptions(resultOptions);
        setLoading(false);
      }, 300);
    },
    [data, load, options]
  );

  const updateSelection = useCallback(
    (selected) => {
      setSelectedTags(selected);
      setSelectedOptions(selected);
    },
    [options]
  );

  const updateTags = () => {
    setSelectedTags((prev) => [...prev, inputValue]);
    setOptions((prev) => [...prev, inputValue]);
    setData((prev) => [...prev, { value: inputValue, label: inputValue }]);
    setSelectedOptions((prev) => [...prev, inputValue]);
  };

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      prefix={<Icon source={SearchMinor} />}
      placeholder="Search"
    />
  );

  const removeTag = useCallback(
    (tag) => () => {
      setSelectedTags((previousTags) =>
        previousTags.filter((previousTag) => previousTag !== tag)
      );
      setSelectedOptions((previousTags) =>
        previousTags.filter((previousTag) => previousTag !== tag)
      );
    },
    []
  );

  const tagMarkup = selectedTags.map((option) => (
    <Tag key={option} onRemove={removeTag(option)}>
      {option}
    </Tag>
  ));

  //collection

  const [collectionData, setCollectionData] = useState([]);

  //fetch data on collections

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
    setCollectionData(response);
  }, []);

  useEffect(() => {
    updateCollectionData();
  }, [updateCollectionData]);

  //polaris states and handlers for collection

  const [selectedCollections, setSelectedCollections] = useState([]);
  const [inputCollectionValue, setInputCollectionValue] = useState("");
  const [collectionOptions, setCollectionOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => setCollectionOptions(collectionData), [collectionData]);

  const removeCollectionTag = useCallback(
    (tag) => () => {
      const options = [...selectedCollections];
      options.splice(options.indexOf(tag), 1);
      setSelectedCollections(options);
      setSelectedData((prev) => {
        return prev.filter((el) => el.value !== tag);
      });
    },
    [selectedCollections]
  );

  const updateCollectionText = useCallback(
    (value) => {
      setInputCollectionValue(value);

      if (value === "") {
        setCollectionOptions(collectionData);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = collectionData.filter((option) =>
        option.label.match(filterRegex)
      );

      let endIndex = resultOptions.length - 1;
      if (resultOptions.length === 0) {
        endIndex = 0;
      }
      setCollectionOptions(resultOptions);
      setInputCollectionValue;
    },
    [collectionData]
  );

  const textCollectionField = (
    <Autocomplete.TextField
      onChange={updateCollectionText}
      label="Collections"
      value={inputCollectionValue}
      plCollectionaceholder="Vintage, cotton, summer"
    />
  );

  const hasSelectedOptions = selectedCollections.length > 0;

  const handleCollectionSelection = (selected) => {
    const mutatedData = selected.map((el) => {
      for (const a of collectionData) {
        if (el === a.value) {
          return {
            value: el,
            id: a.id,
            image: a.image,
          };
        }
      }
    });
    setSelectedData([...mutatedData]);
    setSelectedCollections(selected);
  };

  const tagsMarkup = hasSelectedOptions
    ? selectedCollections.map((option) => {
        let tagLabel = "";
        tagLabel = option.replace("_", " ");
        tagLabel = titleCase(tagLabel);
        return (
          <Tag key={`option${option}`} onRemove={removeCollectionTag(option)}>
            {tagLabel}
          </Tag>
        );
      })
    : null;
  const selectedTagMarkup = hasSelectedOptions ? (
    <Stack spacing="extraTight">{tagsMarkup}</Stack>
  ) : null;

  function titleCase(string) {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  }

  // States and handlers for product's price table

  const [productTable, setProductTable] = useState([]);

  //modify price based on rule

  const updatePrice = () => {
    let newData = [];
    if (customPrice === "a" && Number(amount) > 0 && productTable.length > 0) {
      newData = productTable.map((el) => {
        return {
          productName: el.productName,
          price: amount,
        };
      });
    } else if (
      customPrice === "b" &&
      Number(amount) > 0 &&
      productTable.length > 0
    ) {
      newData = productTable.map((el) => {
        if (
          el.price.length === 1 &&
          Number(el.price[0].price) <= Number(amount)
        ) {
          return {
            productName: el.productName,
            price: 0,
          };
        } else if (
          el.price.length === 1 &&
          Number(el.price[0].price) > Number(amount)
        ) {
          return {
            productName: el.productName,
            price: Number(el.price[0].price) - Number(amount),
          };
        } else if (el.price.length > 1) {
          return {
            productName: el.productName,
            price: `all variant discount ${amount}$`,
          };
        }
      });
    } else if (
      customPrice === "c" &&
      100 >= Number(amount) > 0 &&
      productTable.length > 0
    ) {
      newData = productTable.map((el) => {
        if (el.price.length === 1) {
          return {
            productName: el.productName,
            price:
              Number(el.price[0].price) -
              Number(el.price[0].price) * (Number(amount) / 100),
          };
        } else if (el.price.length > 1) {
          return {
            productName: el.productName,
            price: `all variant discount ${amount}%`,
          };
        }
      });
    }
    setProductDiscount([...newData]);
  };

  //modify data for with product rule

  const updateProductTable = () => {
    if (productRule === "All products") {
      const newData = displayAllProducts.map((el) => {
        return {
          productName: el.productName,
          price: [...el.price],
        };
      });
      setProductTable([...newData]);
    }
    if (productRule === "Specific products") {
      const selectedProductId = displayProducts.map((el) => el.id);
      const newData = displayAllProducts.filter((el) =>
        selectedProductId.includes(el.id)
      );
      setProductTable([...newData]);
    }
    if (productRule === "Product collections") {
      const selectedCollectionId = selectedData.map((el) => el.id);
      const selectedProductId = productWithCollection?.filter((el) => {
        return el.collections.some((id) => selectedCollectionId.includes(id));
      });
      const selectedId = selectedProductId?.map((el) => el.id);
      const newData = displayAllProducts
        .filter((el) => {
          return selectedId?.includes(el.id);
        })
        .map((el) => {
          return {
            productName: el.productName,
            price: [...el.price],
          };
        });
      setProductTable([...newData]);
    }
    if (productRule === "Product tags") {
      const selectedProductId = displayAllProducts.filter((el) => {
        return el.tags.some((tag) => selectedOptions.includes(tag));
      });
      const newData = selectedProductId.map((el) => {
        return {
          productName: el.productName,
          price: [...el.price],
        };
      });
      setProductTable([...newData]);
    }
  };

  //State for product with modified price

  const [productDiscount, setProductDiscount] = useState([]);

  //handle submission and validation

  const handleSubmitDiscount = () => {
    if (priceName && Number.isInteger(Number(priority)) && Number(amount) > 0) {
      updateProductTable();
      setError(() => {
        return {
          errorPriceName: "",
          errorPriority: "",
          errorAmount: "",
        };
      });
    }
    if (priceName) {
      setError((prev) => {
        return {
          ...prev,
          errorPriceName: "",
        };
      });
    }
    if (Number.isInteger(Number(priority))) {
      setError((prev) => {
        return {
          ...prev,
          errorPriority: "",
        };
      });
    }
    if (100 > Number(amount) > 0 && amount) {
      setError((prev) => {
        return {
          ...prev,
          errorAmount: "",
        };
      });
    }
    if (!priceName) {
      setError((prev) => {
        return {
          ...prev,
          errorPriceName: "Invalid price name",
        };
      });
    }
    if (!Number.isInteger(Number(priority)) || !priority) {
      setError((prev) => {
        return {
          ...prev,
          errorPriority: "Invalid priority",
        };
      });
    }
    if (
      (productRule === "a" || productRule === "b") &&
      (Number(amount) < 0 || !amount)
    ) {
      setError((prev) => {
        return {
          ...prev,
          errorAmount: "Invalid amount",
        };
      });
    }
    if (productRule === "c" && (100 <= Number(amount) < 0 || !amount)) {
      setError((prev) => {
        return {
          ...prev,
          errorAmount: "Invalid amount",
        };
      });
    }
  };

  useEffect(() => {
    updatePrice();
  }, [productTable]);

  const rows = productDiscount.map((el) => [el.productName, el.price]);

  //Save created pricing data in local storage

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(productDiscount));
  }, [productDiscount]);

  return (
    <Page fullWidth>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <Form onSubmit={handleSubmitDiscount}>
            <FormLayout>
              <GeneralInfo
                key="generalInfo"
                priceName={priceName}
                handleNameChange={handleNameChange}
                priority={priority}
                handlePriorityChange={handlePriorityChange}
                status={status}
                handleStatus={handleStatus}
                errorPriceName={error.errorPriceName}
                errorPriority={error.errorPriority}
              />
              <AppliedProduct
                key="appliedProduct"
                handleProductRule={handleProductRule}
                productRule={productRule}
                open={open}
                cancelResoursePicker={cancelResoursePicker}
                handleProductPicker={handleProductPicker}
                selectedProducts={selected.products}
                displayProducts={displayProducts}
                selectedTags={selected.tags}
                setDisplayProducts={setDisplayProducts}
                selectedCollection={selected.collections}
                handleProductSelection={handleProductSelection}
                updateTags={updateTags}
                options={options}
                selectedOptions={selectedOptions}
                updateSelection={updateSelection}
                load={load}
                textField={textField}
                tagMarkup={tagMarkup}
                collectionOptions={collectionOptions}
                selectedCollections={selectedCollections}
                textCollectionField={textCollectionField}
                handleCollectionSelection={handleCollectionSelection}
                isLoading={isLoading}
                selectedTagMarkup={selectedTagMarkup}
              />
              <CustomPrice
                key="customPrice"
                handleAmountChange={handleAmountChange}
                handleCustomPriceOption={handleCustomPriceOption}
                customPrice={customPrice}
                amount={amount}
                errorAmount={error.errorAmount}
              />
              <Button submit>Submit</Button>
            </FormLayout>
          </Form>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <Card title="Product pricing detail" sectioned>
            <div style={{ overflowY: "auto", maxHeight: "750px" }}>
              {rows && (
                <DataTable
                  columnContentTypes={["text", "text"]}
                  headings={["Product", "Modifiled Price"]}
                  rows={rows}
                />
              )}
            </div>
          </Card>
        </Grid.Cell>
      </Grid>
    </Page>
  );
}
