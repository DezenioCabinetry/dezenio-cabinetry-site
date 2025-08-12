"use client";

import { SearchBox } from "@mapbox/search-js-react";
import type { SearchBoxProps } from "@mapbox/search-js-react";

export default function MapboxSearchBox(props: SearchBoxProps) {
  return <SearchBox {...props} />;
}
