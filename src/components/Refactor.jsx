import {
  Form,
  FormLayout,
  TextField,
  Button,
  Page,
  Grid,
} from "@shopify/polaris";
import { useState, useCallback } from "react";
import { useStore, actions } from "../store";

import GI from "./GI";
import ATP from "./ATP";

export default function PriceFrom() {
  const [state, dispatch] = useStore();

  const [url, setUrl] = useState("");

  const handleSubmit = useCallback((_event) => setUrl(""), []);

  const handleUrlChange = useCallback((value) => setUrl(value), []);

  return (
    <Page fullWidth>
      <Grid>
        <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
          <Form noValidate onSubmit={handleSubmit}>
            <FormLayout>
              <GI />
              <ATP />
              <Button submit>Submit</Button>
            </FormLayout>
          </Form>
        </Grid.Cell>
        <Grid.Cell
          columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}
        ></Grid.Cell>
      </Grid>
    </Page>
  );
}
