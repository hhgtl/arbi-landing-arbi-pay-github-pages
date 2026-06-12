import type { ArbiPayLandingFormField } from "../../../../../lib/useGetArbiPayLandingData";

export const groupFormFieldsIntoRows = (
  fields: ArbiPayLandingFormField[],
): ArbiPayLandingFormField[][] => {
  const visible = fields.filter((field) => field.visible);
  const rows: ArbiPayLandingFormField[][] = [];
  const processedIds = new Set<string>();
  const usedRowGroups = new Set<string>();

  for (const field of visible) {
    if (processedIds.has(field.fieldId)) {
      continue;
    }

    if (field.width === "full") {
      rows.push([field]);
      processedIds.add(field.fieldId);
      continue;
    }

    const rowGroup = field.rowGroup.trim();

    if (rowGroup) {
      if (!usedRowGroups.has(rowGroup)) {
        usedRowGroups.add(rowGroup);
        const groupFields = visible.filter(
          (item) =>
            item.width === "half" &&
            item.rowGroup.trim() === rowGroup &&
            !processedIds.has(item.fieldId),
        );
        groupFields.forEach((item) => processedIds.add(item.fieldId));
        rows.push(groupFields);
      }
      continue;
    }

    const fieldIndex = visible.indexOf(field);
    const nextField = visible[fieldIndex + 1];

    if (
      nextField &&
      !processedIds.has(nextField.fieldId) &&
      nextField.width === "half" &&
      !nextField.rowGroup.trim()
    ) {
      rows.push([field, nextField]);
      processedIds.add(field.fieldId);
      processedIds.add(nextField.fieldId);
      continue;
    }

    rows.push([field]);
    processedIds.add(field.fieldId);
  }

  return rows;
};
