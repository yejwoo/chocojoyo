"use client";

import { supabase } from "@/lib/supabaseClient";

export const handleTabClick = (index, selectionState, setSelectionState, uiState, setUIState) => {
  setSelectionState((prev) => ({ ...prev, currentTabIndex: index }));

  if (uiState.isZoomMode && index === 1) {
    setUIState((prev) => ({ ...prev, isZoomMode: false }));
  }
};

export const handleColorSelection = (color, setSelectionState) => {
  setSelectionState((prev) => ({ ...prev, currentColor: color }));
};

export const handleToppingSelection = (topping, setSelectionState) => {
  setSelectionState((prev) => ({ ...prev, currentTopping: topping }));
};

export const handleComplete = async (chocolateInfo, formData, router) => {
  const response = await fetch("/api/cards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ formData, chocolateInfo }),
  });

  const result = await response.json();

  if (result.error) {
    console.error("Error:", result.error);
    return;
  }

  const newCardId = result.data[0].id;
  router.push(`/share?id=${newCardId}`);
};
