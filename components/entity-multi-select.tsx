"use client";

import {
  Combobox,
  Loader,
  useCombobox,
  Stack,
  Text,
  rem,
  Pill,
  PillsInput,
} from "@mantine/core";
import { createFormActions } from "@mantine/form";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";

export type EntityMultiSelectProps = {
  formActionName: string;
  formField: string;
  label?: string;
  initialValue?: { id: string; [key: string]: any }[] | null;
  error?: string;
  action: any;
  displayKey: string;
  dataKey: string;
};

export const EntityMultiSelect = ({
  formActionName,
  formField,
  label,
  initialValue,
  error,
  action,
  displayKey,
  dataKey,
}: EntityMultiSelectProps) => {
  const formAction = createFormActions(formActionName);

  const [firstOpen, setFirstOpen] = useState(false);
  const [value, setValue] = useState<{ id: string; [key: string]: any }[]>(
    initialValue || []
  );
  const [search, setSearch] = useState("");

  const [debounced] = useDebouncedValue(search, 300);

  const { isLoading, data } = useQuery({
    queryKey: [debounced],
    queryFn: () => action(debounced),
    enabled: firstOpen,
  });

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
      if (!firstOpen) {
        setFirstOpen(true);
      }
    },
  });

  return (
    <Stack gap={rem(4)}>
      <Text component="label" size="sm" fw={500}>
        {label}
      </Text>
      <Combobox
        store={combobox}
        withinPortal={true}
        onOptionSubmit={(val) => {
          const selectedEntity = data[dataKey].find(
            (entity) => entity.id === val
          );
          const isItemSelected = value.some((item) => item.id === val);

          if (isItemSelected) {
            setValue(value.filter((v) => v.id !== val));
            formAction.removeListItem(
              formField,
              value.findIndex((v) => v.id === val)
            );
          } else {
            setValue([...value, selectedEntity]);
            formAction.insertListItem(formField, selectedEntity);
          }
        }}
      >
        <Combobox.Target>
          <PillsInput onClick={() => combobox.openDropdown()}>
            <Pill.Group>
              {value.map((item, index) => (
                <Pill
                  key={item.id}
                  withRemoveButton
                  onRemove={() => {
                    setValue((current) =>
                      current.filter((v) => v.id !== item.id)
                    );
                    formAction.removeListItem(formField, index);
                  }}
                >
                  {item[displayKey]}
                </Pill>
              ))}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={() => combobox.openDropdown()}
                  value={search}
                  placeholder={`Suche ${label}`}
                  onChange={(event) => {
                    combobox.updateSelectedOptionIndex();
                    setSearch(event.currentTarget.value);
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder={`Suche ${label}`}
          />
          <Combobox.Options>
            {data && data[dataKey].length > 0 ? (
              data[dataKey].map((item) => (
                <Combobox.Option value={item.id} key={item.id}>
                  {item[displayKey]}
                </Combobox.Option>
              ))
            ) : (
              <Combobox.Empty>
                {data && data[dataKey].length === 0 && "Keine Ergebnisse"}
                {isLoading && <Loader />}
              </Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      {error && (
        <Text c="red" size="xs">
          {error}
        </Text>
      )}
    </Stack>
  );
};
