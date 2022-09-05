import { Autocomplete, Icon, Stack, Tag } from "@shopify/polaris";
import { SearchMinor, CirclePlusMinor } from "@shopify/polaris-icons";
import { useState, useCallback, useMemo } from "react";
import { useStore, actions } from "../store";

export default function SeachTag() {
  const [state, dispatch] = useStore();
  const { allTags, selectedTags } = state;

  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(allTags);
  const [loading, setLoading] = useState(false);

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (!loading) {
        setLoading(true);
      }

      setTimeout(() => {
        if (value === "") {
          setOptions(allTags);
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
    [allTags, loading, options]
  );

  const updateSelection = useCallback(
    (selected) => {
      const selectedText = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });
      dispatch(actions.updateSelectedTags(selected));
      setInputValue(selectedText[0]);
    },
    [options]
  );

  console.log(selectedTags);

  const removeTag = useCallback(
    (tag) => () => {
      console.log(selectedTags);
      // const response = selectedTags.filter((el) => el !== tag);
      // dispatch(actions.updateSelectedTags(response));
    },
    []
  );

  const tagMarkup = selectedTags.map((option) => (
    <Tag key={option} onRemove={removeTag(option)}>
      {option}
    </Tag>
  ));

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      prefix={<Icon source={SearchMinor} />}
      placeholder="Search"
    />
  );

  return (
    <Stack vertical spacing="loose">
      <Autocomplete
        actionBefore={{
          accessibilityLabel: "Action label",
          badge: {
            status: "new",
            content: "New!",
          },
          content: "Action with long name",
          ellipsis: true,
          helpText: "Help text",
          icon: CirclePlusMinor,
          onAction: () => {
            console.log("actionBefore clicked!");
          },
        }}
        options={options}
        selected={selectedTags}
        onSelect={updateSelection}
        listTitle="Suggested tags"
        loading={loading}
        textField={textField}
        allowMultiple
      />
      <Stack spacing="tight">{tagMarkup}</Stack>
    </Stack>
  );
}
