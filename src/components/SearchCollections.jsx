import { Autocomplete, Icon, Stack, Tag } from "@shopify/polaris";
import { GamesConsoleMajor, SearchMinor } from "@shopify/polaris-icons";
import { useState, useCallback, useEffect } from "react";
import { useStore, actions } from "../store";
import { useAppBridge } from "@shopify/app-bridge-react";
import { userLoggedInFetch } from "../App";

export default function SearchCollection() {
  const [state, dispatch] = useStore();
  const { allCollections, collectionData } = state;

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([...allCollections]);

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
      const response = collectionData.filter((el) => el.value !== tag);
      dispatch(actions.updateCollectionData(response));
    },
    [selectedOptions]
  );

  console.log(collectionData);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(allCollections);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = allCollections.filter((option) =>
        option.label.match(filterRegex)
      );

      let endIndex = resultOptions.length - 1;
      if (resultOptions.length === 0) {
        endIndex = 0;
      }
      setOptions(resultOptions);
      setInputValue;
    },
    [allCollections]
  );

  const handleCollectionSelection = (selected) => {
    const mutatedData = selected.map((el) => {
      for (const a of allCollections) {
        if (el === a.value) {
          return {
            value: el,
            id: a.id,
            image: a.image,
          };
        }
      }
    });
    dispatch(actions.updateCollectionData(mutatedData));
    setSelectedOptions(selected);
  };

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Collections"
      value={inputValue}
      placeholder="Vintage, cotton, summer"
    />
  );

  const hasSelectedOptions = selectedOptions.length > 0;

  const tagsMarkup = hasSelectedOptions
    ? selectedOptions.map((option) => {
        let tagLabel = "";
        tagLabel = option.replace("_", " ");
        tagLabel = titleCase(tagLabel);
        return (
          <Tag key={`option${option}`} onRemove={removeTag(option)}>
            {tagLabel}
          </Tag>
        );
      })
    : null;
  const selectedTagMarkup = hasSelectedOptions ? (
    <Stack spacing="extraTight">{tagsMarkup}</Stack>
  ) : null;

  return (
    <Stack vertical spacing="loose">
      (
      <Autocomplete
        allowMultiple
        options={options}
        selected={selectedOptions}
        textField={textField}
        onSelect={handleCollectionSelection}
        listTitle="Suggested Collections"
      />
      ){selectedTagMarkup}
    </Stack>
  );
  function titleCase(string) {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(" ");
  }
}
