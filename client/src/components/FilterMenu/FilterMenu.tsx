import React, { SyntheticEvent, useEffect, useState } from "react";
import Select from "../Input/Select";
import { COMPARISON_METHODS_LIST } from "../../settings/comparisonMethods";
import Input from "../Input/Input";
import { SchemaField } from "../../types";

export type OnFilter = (
  controlValue: string,
  methodName: string,
  field: SchemaField
) => unknown;

interface FilterMenuProps {
  fields: SchemaField[];
  onFilter: OnFilter;
  className: string;
}

export default function FilterMenu({
  fields,
  onFilter,
  className,
}: FilterMenuProps) {
  const [form, setForm] = useState({
    field: fields[0],
    comparisonMethodName: Object.keys(COMPARISON_METHODS_LIST)[0],
    controlValue: "",
  });

  function formUpdateHandler({
    currentTarget,
  }: SyntheticEvent<HTMLSelectElement | HTMLInputElement>) {
    const { value, name } = currentTarget;
    setForm({ ...form, [name]: value });
  }

  useEffect(() => {
    const { controlValue, comparisonMethodName, field } = form;
    onFilter(controlValue, comparisonMethodName, field);
  }, [form, onFilter]);

  return (
    <div className={className}>
      <Select
        label={"Field for filter: "}
        options={fields}
        onChange={formUpdateHandler}
        name={"field"}
        value={form.field}
      />
      <Select
        label={"Filter method: "}
        options={Object.keys(COMPARISON_METHODS_LIST)}
        onChange={formUpdateHandler}
        name={"comparisonMethodName"}
        value={form.comparisonMethodName}
      />
      <Input
        label={"Value: "}
        type={"text"}
        name={"controlValue"}
        value={form.controlValue}
        onChange={formUpdateHandler}
      />
    </div>
  );
}
