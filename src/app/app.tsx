import React, { useState } from "react";
import { ISelectOption } from "../ui-kit/select/MultipleSelect/MultipleSelect";
import russia from "../assets/images/russia.svg";
import spain from "../assets/images/spain.svg";
import italy from "../assets/images/italy.svg";
import germany from "../assets/images/germany.svg";
import poland from "../assets/images/poland.svg";
import great_britain from "../assets/images/great_britain.svg";
import MultipleSelect from "../ui-kit/select/MultipleSelect/MultipleSelect";
import * as styles from "./app.module.css";

const options = [
  {
    label: { text: "Русский", image_src: russia },
    value: 1,
  },
  {
    label: { text: "Испанский", image_src: spain },
    value: 2,
  },
  {
    label: { text: "Итальянский", image_src: italy },
    value: 3,
  },
  {
    label: { text: "Немецкий", image_src: germany },
    value: 4,
  },
  {
    label: { text: "Польский", image_src: poland },
    value: 5,
  },
  {
    label: { text: "Английский", image_src: great_britain },
    value: 6,
  },
];

export default function App() {
  const [singleValue2, setSingleValue2] = useState<ISelectOption[]>([
    options[0],
  ]);

  return (
    <div className={styles.app}>
      <MultipleSelect
        value={singleValue2}
        options={options}
        onChange={(option) => setSingleValue2(option)}
      />
    </div>
  );
}
