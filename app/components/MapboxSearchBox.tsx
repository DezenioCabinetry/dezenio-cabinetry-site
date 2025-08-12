"use client";

import * as React from "react";
import { SearchBox } from "@mapbox/search-js-react";

// Infer the prop types from the component
type Props = React.ComponentProps<typeof SearchBox>;

export default function MapboxSearchBox(props: Props) {
  return <SearchBox {...props} />;
}
