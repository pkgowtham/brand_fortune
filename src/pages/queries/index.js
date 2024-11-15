import * as React from "react";
import { Box } from "@material-ui/core";

import List from "./list";
import Filter from "./filter";

export default function Project() {
  return (
    <Box>
      <Filter />
      <Box>
        <List />
      </Box>
    </Box>
  );
}
