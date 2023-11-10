import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import * as styles from "./Checkbox.module.css";

export interface ICheckbox
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "type"
  > {
  label?: string;
}

const Checkbox: FC<ICheckbox> = ({ label, ...props }) => {
  return (
    <label className={styles.label}>
      <input type="checkbox" {...props} className={styles.input} />
      <span className={styles.checkboxCheckmark}></span>
      {label}
    </label>
  );
};

export default Checkbox;
