'use client';
// [!region import]
import * as React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxClear,
  ComboboxTrigger,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxSeparator,
} from "../base-ui/combobox";
// [!endregion import]

// [!region structure]
<Combobox>
  <ComboboxInput />
  <ComboboxClear />
  <ComboboxTrigger />
  <ComboboxContent>
    <ComboboxList>
      <ComboboxItem />
    </ComboboxList>
  </ComboboxContent>
</Combobox>;
// [!endregion structure]

// [!region usage]
export function ComboboxComponent() {
  const id = React.useId();

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        Choose a fruit
      </label>
      <div className="relative w-80">
        <Combobox items={fruits}>
          <ComboboxInput
            placeholder="Search fruits..."
            id={id}
            showSearchIcon
            className="w-full"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
            <ComboboxClear aria-label="Clear selection" />
            <ComboboxTrigger aria-label="Open popup" />
          </div>
          <ComboboxContent>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  );
}
// [!endregion usage]

// [!region small]
export function ComboboxSmall() {
    return (
        <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
            Small
            </label>
            <div className="relative w-64">
            <Combobox items={fruits.slice(0, 5)}>
                <ComboboxInput
                placeholder="Small combobox..."
                showSearchIcon
                className="w-full"
                />
                <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
                <ComboboxClear aria-label="Clear" />
                <ComboboxTrigger aria-label="Open" />
                </div>
                <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                    {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                        {item}
                    </ComboboxItem>
                    )}
                </ComboboxList>
                </ComboboxContent>
            </Combobox>
            </div>
        </div>
    )
}
// [!endregion small]

// [!region grouped]
export function ComboboxGrouped() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Grouped Fruits (Citrus & Berries)
      </label>
      <div className="relative w-80">
        <Combobox items={groupedFruits}>
          <ComboboxInput
            placeholder="Search grouped fruits..."
            showSearchIcon
            className="w-full"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
            <ComboboxClear aria-label="Clear selection" />
            <ComboboxTrigger aria-label="Open popup" />
          </div>
          <ComboboxContent>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
            <ComboboxList>
              <ComboboxGroup>
                <ComboboxGroupLabel>Citrus Fruits</ComboboxGroupLabel>
                {citrusFruits.map((item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
              <ComboboxSeparator />
              <ComboboxGroup>
                <ComboboxGroupLabel>Berries</ComboboxGroupLabel>
                {berryFruits.map((item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  );
}
// [!endregion grouped]

// [!region without-indicator]
export function ComboboxWithoutIndicator() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Without Selection Indicator
      </label>
      <div className="relative w-80">
        <Combobox items={fruits.slice(0, 8)}>
          <ComboboxInput
            placeholder="No checkmarks..."
            showSearchIcon
            className="w-full"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
            <ComboboxClear aria-label="Clear selection" />
            <ComboboxTrigger aria-label="Open popup" />
          </div>
          <ComboboxContent>
            <ComboboxEmpty>No fruits found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item} showIndicator={false}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  );
}
// [!endregion without-indicator]


const fruits = [
  "Apple",
  "Banana",
  "Orange",
  "Pineapple",
  "Grape",
  "Mango",
  "Strawberry",
  "Blueberry",
  "Raspberry",
  "Blackberry",
  "Cherry",
  "Peach",
  "Pear",
  "Plum",
  "Kiwi",
  "Watermelon",
  "Cantaloupe",
  "Honeydew",
  "Papaya",
  "Guava",
  "Lychee",
  "Pomegranate",
  "Apricot",
  "Grapefruit",
  "Passionfruit",
];

const citrusFruits = [
  "Orange",
  "Lemon",
  "Lime",
  "Grapefruit",
  "Tangerine",
  "Clementine",
  "Mandarin",
  "Pomelo",
];

const berryFruits = [
  "Strawberry",
  "Blueberry",
  "Raspberry",
  "Blackberry",
  "Cranberry",
  "Gooseberry",
  "Elderberry",
  "Mulberry",
];

const groupedFruits = [...citrusFruits, ...berryFruits];