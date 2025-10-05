"use client";

// [!region import]
import * as React from "react";
import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteEmpty,
  AutocompleteClear,
  AutocompleteTrigger,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteSeparator,
} from "../base-ui/autocomplete";
// [!endregion import]

// [!region structure]
<Autocomplete>
  <AutocompleteInput />
  <AutocompleteClear />
  <AutocompleteTrigger />
  <AutocompleteContent>
    <AutocompleteList>
      <AutocompleteItem />
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>;
// [!endregion structure]

// [!region usage]
export function AutocompleteComponent() {
  const id = React.useId();

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        Search for a country
      </label>
      <div className="relative w-80">
        <Autocomplete items={countries}>
          <AutocompleteInput
            placeholder="Type to search countries..."
            id={id}
            showSearchIcon
            className="w-full"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
            <AutocompleteClear aria-label="Clear selection" />
            <AutocompleteTrigger aria-label="Open suggestions" />
          </div>
          <AutocompleteContent>
            <AutocompleteEmpty>No countries found.</AutocompleteEmpty>
            <AutocompleteList>
              {(item: string) => (
                <AutocompleteItem key={item} value={item}>
                  {item}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </div>
    </div>
  );
}
// [!endregion usage]

// [!region grouped]
export function AutocompleteGrouped() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Search Technologies
      </label>
      <div className="relative w-80">
        <Autocomplete items={groupedTechnologies}>
          <AutocompleteInput
            placeholder="Search technologies..."
            showSearchIcon
            className="w-full"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
            <AutocompleteClear aria-label="Clear selection" />
            <AutocompleteTrigger aria-label="Open suggestions" />
          </div>
          <AutocompleteContent>
            <AutocompleteEmpty>No technologies found.</AutocompleteEmpty>
            <AutocompleteList>
              <AutocompleteGroup>
                <AutocompleteGroupLabel>Frontend</AutocompleteGroupLabel>
                {frontendTech.map((item) => (
                  <AutocompleteItem key={item} value={item}>
                    {item}
                  </AutocompleteItem>
                ))}
              </AutocompleteGroup>
              <AutocompleteSeparator />
              <AutocompleteGroup>
                <AutocompleteGroupLabel>Backend</AutocompleteGroupLabel>
                {backendTech.map((item) => (
                  <AutocompleteItem key={item} value={item}>
                    {item}
                  </AutocompleteItem>
                ))}
              </AutocompleteGroup>
              <AutocompleteSeparator />
              <AutocompleteGroup>
                <AutocompleteGroupLabel>Database</AutocompleteGroupLabel>
                {databaseTech.map((item) => (
                  <AutocompleteItem key={item} value={item}>
                    {item}
                  </AutocompleteItem>
                ))}
              </AutocompleteGroup>
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </div>
    </div>
  );
}
// [!endregion grouped]

// [!region with-indicator]
export function AutocompleteWithIndicator() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        With Selection Indicators
      </label>
      <div className="relative w-80">
        <Autocomplete items={frameworks.slice(0, 8)}>
          <AutocompleteInput
            placeholder="Select a framework..."
            showSearchIcon
            className="w-full"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
            <AutocompleteClear aria-label="Clear selection" />
            <AutocompleteTrigger aria-label="Open suggestions" />
          </div>
          <AutocompleteContent>
            <AutocompleteEmpty>No frameworks found.</AutocompleteEmpty>
            <AutocompleteList>
              {(item: string) => (
                <AutocompleteItem key={item} value={item} showIndicator>
                  {item}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </div>
    </div>
  );
}
// [!endregion with-indicator]

// [!region multiline]
export function AutocompleteMultiline() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        Search Cities
      </label>
      <div className="relative w-80">
        <Autocomplete items={citiesWithDetails}>
          <AutocompleteInput
            placeholder="Search cities..."
            showSearchIcon
            className="w-full"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
            <AutocompleteClear aria-label="Clear selection" />
            <AutocompleteTrigger aria-label="Open suggestions" />
          </div>
          <AutocompleteContent>
            <AutocompleteEmpty>No cities found.</AutocompleteEmpty>
            <AutocompleteList>
              {(item: { name: string; country: string; population: string }) => (
                <AutocompleteItem key={item.name} value={item.name}>
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.country} • {item.population}
                    </span>
                  </div>
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </div>
    </div>
  );
}
// [!endregion multiline]

// [!region disabled]
export function AutocompleteDisabled() {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">
        Disabled Autocomplete
      </label>
      <div className="relative w-80">
        <Autocomplete items={countries}>
          <AutocompleteInput
            placeholder="This is disabled..."
            showSearchIcon
            disabled
            className="w-full"
          />
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
            <AutocompleteClear aria-label="Clear selection" />
            <AutocompleteTrigger aria-label="Open suggestions" />
          </div>
          <AutocompleteContent>
            <AutocompleteEmpty>No countries found.</AutocompleteEmpty>
            <AutocompleteList>
              {(item: string) => (
                <AutocompleteItem key={item} value={item}>
                  {item}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      </div>
    </div>
  );
}
// [!endregion disabled]

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Australia",
  "Austria",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Denmark",
  "Egypt",
  "Finland",
  "France",
  "Germany",
  "India",
  "Indonesia",
  "Italy",
  "Japan",
  "Mexico",
  "Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Russia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Taiwan",
  "Thailand",
  "Turkey",
  "United Kingdom",
  "United States",
  "Vietnam",
];

const programmingLanguages = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "C++",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "PHP",
  "Ruby",
  "Scala",
  "Dart",
  "R",
  "MATLAB",
  "Perl",
  "Haskell",
  "Clojure",
  "Elixir",
];

const frontendTech = [
  "React",
  "Vue.js",
  "Angular",
  "Svelte",
  "Next.js",
  "Nuxt.js",
  "SvelteKit",
  "Astro",
  "Remix",
  "Gatsby",
];

const backendTech = [
  "Node.js",
  "Express",
  "Fastify",
  "NestJS",
  "Django",
  "Flask",
  "FastAPI",
  "Spring Boot",
  "ASP.NET Core",
  "Laravel",
];

const databaseTech = [
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "SQLite",
  "Elasticsearch",
  "Cassandra",
  "DynamoDB",
  "Neo4j",
  "InfluxDB",
];

const groupedTechnologies = [...frontendTech, ...backendTech, ...databaseTech];

const frameworks = [
  "React",
  "Vue.js",
  "Angular",
  "Svelte",
  "Next.js",
  "Nuxt.js",
  "SvelteKit",
  "Astro",
  "Remix",
  "Gatsby",
  "Express",
  "Fastify",
  "NestJS",
  "Django",
  "Flask",
  "FastAPI",
  "Spring Boot",
  "ASP.NET Core",
  "Laravel",
  "Symfony",
];

const citiesWithDetails = [
  { name: "New York", country: "United States", population: "8.4M" },
  { name: "London", country: "United Kingdom", population: "9.5M" },
  { name: "Tokyo", country: "Japan", population: "14.0M" },
  { name: "Paris", country: "France", population: "11.1M" },
  { name: "Sydney", country: "Australia", population: "5.3M" },
  { name: "Berlin", country: "Germany", population: "3.7M" },
  { name: "Toronto", country: "Canada", population: "6.3M" },
  { name: "Barcelona", country: "Spain", population: "5.6M" },
  { name: "Amsterdam", country: "Netherlands", population: "1.2M" },
  { name: "Stockholm", country: "Sweden", population: "1.0M" },
  { name: "Copenhagen", country: "Denmark", population: "1.4M" },
  { name: "Vienna", country: "Austria", population: "1.9M" },
  { name: "Zurich", country: "Switzerland", population: "0.4M" },
  { name: "Singapore", country: "Singapore", population: "5.9M" },
  { name: "Hong Kong", country: "Hong Kong", population: "7.5M" },
];
