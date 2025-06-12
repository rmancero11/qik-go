"use client";
import React, { useState } from "react";

type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

interface DatePickerWithRangeProps {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
  date,
  setDate,
}) => {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fromDate = e.target.value ? new Date(e.target.value) : undefined;
    setDate({ from: fromDate, to: date?.to });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const toDate = e.target.value ? new Date(e.target.value) : undefined;
    setDate({ from: date?.from, to: toDate });
  };

  return (
    <div>
      <label>
        Desde:
        <input
          type="date"
          value={date?.from ? date.from.toISOString().slice(0, 10) : ""}
          onChange={handleFromChange}
        />
      </label>
      <label>
        Hasta:
        <input
          type="date"
          value={date?.to ? date.to.toISOString().slice(0, 10) : ""}
          onChange={handleToChange}
        />
      </label>
    </div>
  );
};

const EmployeePerformance = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 4, 1),
    to: new Date(2023, 4, 31),
  });

  return (
    <div>
      <h2>Seleccionar rango de fechas</h2>
      <DatePickerWithRange date={dateRange} setDate={setDateRange} />
      <p>
        Rango seleccionado: {dateRange?.from?.toLocaleDateString() || "–"} –{" "}
        {dateRange?.to?.toLocaleDateString() || "–"}
      </p>
    </div>
  );
};

export default EmployeePerformance;
